"use client"
import { useState } from "react"
import PasswordInput from './_component/PasswordInput';
import UsernameInput from "./_component/UsernameInput";

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
        <div id="logo" className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#372A54" className="w-[140px] h-[140px]" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"/></svg>
          <h6 className="w-91px relative text-base text-right font-semibold font-rubik text-[#372A54] inline-block">EMPLOYEE</h6>
        </div>
        <form>
          <div className="flex flex-col w-[20rem] gap-3.5 ">
            <label className="relative text-16 tracking-0.02 font-rubik text-black text-left inline-block">Employee ID</label>
            <div className="w-full relative">
              <UsernameInput
              value={email}
              setValue={setEmail}
              />
            </div>
          
            <label className="relative text-16 tracking-0.02 font-rubik text-black text-left inline-block">Password</label>
            <div className="w-full relative">
              <PasswordInput
              value={password}
              setValue={setPassword}
              />
            </div>
            <a type="button" className="w-full relative text-13 tracking-0.02 font-rubik text-grey text-right inline-block">Forget Password ?</a>
            <button type="submit" className="relative w-full h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-rubik text-center inline-block">Login</button>
            </div>
          </form>
      </div>
    )
}