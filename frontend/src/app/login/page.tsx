"use client"
import { useState } from "react"
import PasswordInput from './_component/PasswordInput';
import UsernameInput from "./_component/UsernameInput";
import Link from "next/link";

export default function Page(){

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    return (
      <div className="flex flex-col h-screen items-center justify-center gap-y-[1rem] pb-14">
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
        <form>
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