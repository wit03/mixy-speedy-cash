"use client";
import React, { useState } from "react";
import Register1 from "./_component/Register1";
import Register2 from "./_component/Register2";
import Register3 from "./_component/Register3";
import Register4 from "./_component/Register4";
import { makeRequest } from "@/hook/makeRequets";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Circular } from "../components/Loading/Circular";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link";

export interface AuthAccount {
  accountId:     string;
  accountStatus: string;
  balance:       number;
  accountType:   string;
}

export interface AuthCustomer {
  customerId:   string;
  customerType: string;
  email:        string;
  firstName:    string;
  lastName:     string;
  dateOfBirth:  string;
  phoneNumber:  string;
  address:      string;
  createdAt:    string;
}


const Register = () => {

  const router = useRouter()
  const {setCustomerState}:CustomerContextType = useCustomer?.()!;


  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  // page 1
  const [identity, setIdentity] = useState(new Array(13).fill(""));
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // page 2
  const [salary, setSalary] = useState<number>(0);
  const [career, setCareer] = useState("");
  const [company, setCompany] = useState("");

  // page 3
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // page 4
  const [pin, setPin] = useState(new Array(6).fill(""));

  const [done, setDone] = useState(false)

  const handleNextButtonClick = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  async function handleRegister() {
    setLoading(true)
    const {data, error, status} = await makeRequest<{  
      msg:      string;
      customer: AuthCustomer;
      account:  AuthAccount;
    }>("http://localhost:3000/customer/sign-up", {
      method:"POST",
      data:{
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: new Date(dob).toISOString(),
        phoneNumber: phoneNumber,
        customerType: "personal",
        address: address,
        pin: pin.join(""),
        career: career,
        salary: salary,
        citizenId: identity.join(""),
      }
    })

    if(!data?.customer || error || status !== 201){
      setLoading(false)
      toast.error(error?.data.msg + ", maybe email is already have been taken" || "Failed to create your user or account")
      setPage(1)
      setPin(new Array(6).fill(""))
      return
    }
    else {
      setLoading(false)
      setDone(true)
      // toast.success("Created account done, redirecting to home in 1.5 seconds")
      // setTimeout(() => {
      //   router.push("/")
      // }, 1500);
      const {account, customer} = data
      setCustomerState({
        account:{
          accountId: account.accountId,
          balance: account.balance,
        },
        customer:{
          address: customer.address,
          createdAt: customer.createdAt,
          customerId: customer.customerId,
          customerType: customer.customerType,
          dateOfBirth: customer.dateOfBirth,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
        }
      })
      return
    }


  }

  return (
    <div className="px-6 py-9 h-screen">
      <Circular
      loading={loading}
      />

   {!done && 
   <>
      <div className="text-gray-800 font-rubik text-3xl font-semibold">
        Register
      </div>
      <div className={page === 1 ? "flex h-full" : "hidden"}>
        <Register1 
        identity={identity}
        setIdentity={setIdentity}
        activeIdentityIndex={activeIdentityIndex}
        setActiveIdentityIndex={setActiveIdentityIndex}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        dob={dob}
        setDob={setDob}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        address={address}
        setAddress={setAddress}
        onNextButtonClick={handleNextButtonClick} />
      </div>
      <div className={page === 2 ? "flex h-full" : "hidden"}>
        <Register2
          onNextButtonClick={handleNextButtonClick}
          onPreviousButtonClick={handlePreviousButtonClick}
          salary={salary}
          setSalary={setSalary}
          career={career}
          setCareer={setCareer}
          company={company}
          setCompany={setCompany}
        />
      </div>
      <div className={page === 3 ? "flex h-full" : "hidden"}>
        <Register3
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
          onNextButtonClick={handleNextButtonClick}
          onPreviousButtonClick={handlePreviousButtonClick}
        />
      </div>
      <div className={page === 4 ? "flex h-full" : "hidden"}>
        <Register4
        pin={pin}
        setPin={setPin}
        handleRegister={handleRegister}
        />
      </div>
   </>
   }

   {done && 
    <div className="flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden">
    <svg id="bg" className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
        <circle cx="100" cy="26" r="100" fill="#F8E192" />
    </svg>
    <svg className="absolute bottom-0 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
        <circle cx="28" cy="100" r="100" fill="#2FCBFC4D" />
    </svg>

   <div className="flex flex-col gap-4 items-center justify-center">
    <h6 className="text-3xl font-bold  text-gray-800">Congratulation !</h6>
    <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194" viewBox="0 0 194 194" fill="none">
        <g filter="url(#filter0_d_2365_201)">
            <path d="M97 0C121.665 0 145.32 9.79819 162.761 27.2391C180.202 44.68 190 68.3349 190 93C190 117.665 180.202 141.32 162.761 158.761C145.32 176.202 121.665 186 97 186C72.3349 186 48.68 176.202 31.2391 158.761C13.7982 141.32 4 117.665 4 93C4 68.3349 13.7982 44.68 31.2391 27.2391C48.68 9.79819 72.3349 0 97 0ZM85.4149 111.348L64.7556 90.675C64.0149 89.9344 63.1357 89.3469 62.168 88.946C61.2003 88.5452 60.1632 88.3389 59.1158 88.3389C58.0684 88.3389 57.0312 88.5452 56.0636 88.946C55.0959 89.3469 54.2166 89.9344 53.476 90.675C51.9802 92.1708 51.1399 94.1995 51.1399 96.3148C51.1399 98.4301 51.9802 100.459 53.476 101.955L79.7817 128.26C80.5202 129.005 81.3988 129.595 82.3668 129.999C83.3347 130.402 84.3729 130.609 85.4215 130.609C86.4701 130.609 87.5083 130.402 88.4762 129.999C89.4442 129.595 90.3228 129.005 91.0613 128.26L145.533 73.7756C146.283 73.038 146.88 72.1592 147.289 71.1897C147.699 70.2202 147.912 69.1794 147.917 68.1271C147.922 67.0748 147.718 66.032 147.318 65.0588C146.918 64.0856 146.329 63.2012 145.585 62.4567C144.842 61.7122 143.958 61.1223 142.985 60.721C142.013 60.3197 140.97 60.115 139.918 60.1186C138.865 60.1223 137.824 60.3343 136.854 60.7423C135.884 61.1503 135.005 61.7463 134.266 62.496L85.4149 111.348Z" fill="#A694CF" />
            <path d="M85.4152 109.226L65.8166 89.6147L65.8162 89.6143C64.9363 88.7344 63.8917 88.0364 62.742 87.5602C61.5924 87.084 60.3602 86.8389 59.1158 86.8389C57.8714 86.8389 56.6392 87.084 55.4895 87.5602C54.3399 88.0364 53.2953 88.7344 52.4153 89.6143C50.6383 91.3914 49.6399 93.8016 49.6399 96.3148C49.6399 98.8279 50.6383 101.238 52.4153 103.015L78.7169 129.317C79.5948 130.202 80.6393 130.904 81.79 131.383L82.3668 129.999L81.79 131.383C82.9407 131.863 84.1749 132.109 85.4215 132.109C86.6681 132.109 87.9023 131.863 89.053 131.383L88.4762 129.999L89.053 131.383C90.2029 130.904 91.2467 130.203 92.1242 129.319C92.1249 129.318 92.1255 129.317 92.1261 129.317L146.584 74.8454C146.586 74.8439 146.587 74.8424 146.589 74.8408C147.478 73.9654 148.186 72.9228 148.671 71.773C149.158 70.6211 149.411 69.3843 149.417 68.1341C149.423 66.8838 149.181 65.6448 148.705 64.4884L147.318 65.0588L148.705 64.4884C148.23 63.3321 147.53 62.2813 146.647 61.3967L145.585 62.4567L146.647 61.3967C145.763 60.5121 144.713 59.8111 143.557 59.3344C142.402 58.8576 141.163 58.6143 139.913 58.6187C138.662 58.623 137.425 58.8748 136.273 59.3596C135.122 59.8437 134.079 60.5504 133.202 61.4391C133.201 61.4405 133.199 61.4419 133.198 61.4434L85.4152 109.226ZM97 1.5C121.267 1.5 144.541 11.1402 161.7 28.2997C178.86 45.4593 188.5 68.7327 188.5 93C188.5 117.267 178.86 140.541 161.7 157.7C144.541 174.86 121.267 184.5 97 184.5C72.7327 184.5 49.4593 174.86 32.2997 157.7C15.1402 140.541 5.5 117.267 5.5 93C5.5 68.7327 15.1402 45.4593 32.2997 28.2997C49.4593 11.1402 72.7327 1.5 97 1.5Z" stroke="#7A5DBA" strokeWidth="3" />
        </g>
        <defs>
            <filter id="filter0_d_2365_201" x="0" y="0" width="194" height="194" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2365_201" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2365_201" result="shape" />
            </filter>
        </defs>
    </svg>
    <h6 className="text-gray-800 font-normal text-md px-8 sm:px-16 lg:px-32">Your account have been created successfully</h6>
    <Link
    href={"/"}
        className="content-center hover:opacity-95 mx-auto w-2/3 relative h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block">
        Continue
    </Link>
   </div>

</div>
   }
    </div>
  );
};

export default Register;
