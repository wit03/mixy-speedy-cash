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
  const [firstName, setFirstName] = useState("chitsanupong");
  const [lastName, setLastName] = useState("jateassavapirom");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0948652696");
  const [address, setAddress] = useState("Pathumthani lumkukka kuay");

  // page 2
  const [salary, setSalary] = useState<number>(10000);
  const [career, setCareer] = useState("software engineer");
  const [company, setCompany] = useState("mixy company");

  // page 3
  const [email, setEmail] = useState("mark@gmail.com");
  const [password, setPassword] = useState("123");

  // page 4
  const [pin, setPin] = useState(new Array(6).fill(""));


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
      toast.error(data?.msg || "Failed to create your user or account")
      return
    }
    else {
      setLoading(false)
      toast.success("Created account done, redirecting to home in 1.5 seconds")
      setTimeout(() => {
        router.push("/")
      }, 1500);
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
    </div>
  );
};

export default Register;
