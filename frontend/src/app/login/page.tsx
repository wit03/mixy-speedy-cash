"use client"
import { useState } from "react"
import PasswordInput from './_component/PasswordInput';
import UsernameInput from "./_component/UsernameInput";
import Link from "next/link";
import { makeRequest } from "@/hook/makeRequets";
import { AuthAccount, AuthCustomer } from "../register/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import { Circular } from "../components/Loading/Circular";

export default function Page(){

  const router = useRouter()
  const {setCustomerState}:CustomerContextType = useCustomer?.()!;

    const [email, setEmail] = useState<string>("mark@gmail.com")
    const [password, setPassword] = useState<string>("123")
    const [loading, setLoading] = useState<boolean>(false)
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      
      const {data, error, status} = await makeRequest<{  
        msg:      string;
        customer: AuthCustomer;
        account:  AuthAccount;
      }>("http://localhost:3000/customer/sign-in", {
          method:"POST",
          data:{
              email:email,
              password:password
          }
      })
      if(!data?.customer || error || status !== 200){
        setLoading(false)
        toast.error(data?.msg || "Failed to create your user or account")
        return
      }
      else {
        setLoading(false)
        toast.success("Login done, redirecting to home in 1.5 seconds")
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
      <div className="flex flex-col h-screen items-center justify-center gap-y-[1rem] pb-14">
          <Circular
          loading={loading}
          />
        <svg id="bg" className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
          <circle cx="100" cy="26" r="100" fill="#F8E192"/>
        </svg>
        <svg className="absolute bottom-0 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
          <circle cx="28" cy="100" r="100" fill="#2FCBFC4D"/>
        </svg>
        <div id="logo" className="relative w-[7.5rem] h-[7.5rem]">
          <div className="absolute h-[5rem] w-[5rem] bg-[#FBC2EB] rounded-full bottom-0 z-10"></div>
          <div className="absolute h-[5rem] w-[5rem] bg-[#A694CF] rounded-full top-0 right-0 z-20"></div>
        </div>
        <h6 className="text-black font-rubik text-2xl font-semibold">WMPT</h6>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-[20rem] gap-3.5 ">
            <label className="relative text-16 tracking-0.02 font-rubik text-black text-left">Email</label>
            <div className="w-full relative">
              <UsernameInput
              value={email}
              setValue={setEmail}
              />
            </div>
          
            <label className="relative text-16 tracking-0.02 font-rubik text-black text-left">Password</label>
            <div className="w-full relative">
              <PasswordInput
              value={password}
              setValue={setPassword}
              />
            </div>
            <a type="button" className="w-full relative text-13 tracking-0.02 font-rubik text-grey text-right">Forget Password ?</a>
            <button type="submit" className="relative w-full h-[2.31rem] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-rubik text-center inline-block">Login</button>
            </div>
            <div className="flex flex-row justify-center text-black font-rubik text-base font-normal my-3">
            Don’t have an account?
            <Link className="mx-2 text-blue-500 font-rubik font-extrabold" href="/register">Register</Link>
            </div>
          </form>
      </div>
    )
}