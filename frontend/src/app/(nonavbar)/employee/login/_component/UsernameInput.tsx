"use client"
import { Dispatch, SetStateAction } from "react";

// props
export default function UsernameInput({
    value,
    setValue,
}:{
    value:string;
    setValue:(e:string) => void;
})  {

return (
    <div>
     <input
        placeholder="email"
        className="w-full relative text-gray-a5a5a5 outline-purple-500 text-sm underline decoration-[#a5a5a5] rounded-md bg-[#f5f5f5] py-[18px] ps-[24px] border-4 border-solid border-[#8351F433] box-border h-53 shadow-md tracking-0.02 font-rubik sm:text-sm focus:ring-purple-600"
        value={value}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
    </div>
    )
}
