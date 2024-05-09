"use client"
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

// props
export default function PasswordInput({
    value,
    setValue,
}:{
    value:string;
    setValue:(e:string) => void;
})  {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="font-rubik">
            <input
                placeholder="gormixishere1234"
                className="appearance-none outline-purple-500 w-full relative text-gray-[#a5a5a5] text-sm rounded-md bg-[#f5f5f5] py-[18px] ps-[24px] border-4 border-solid border-[#8351F433] box-border h-53 shadow-md tracking-0.02 font-rubik sm:text-sm focus:ring-purple-600"
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <button
                type = "button"
                className="absolute inset-y-0 right-0 flex items-center px-6 text-gray-600"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" 
                    strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                )}
            </button>
        </div>
    );
}