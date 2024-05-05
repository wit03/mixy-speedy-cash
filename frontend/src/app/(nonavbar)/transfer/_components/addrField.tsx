"use client"
import { useState } from "react"
import { PatternFormat } from "react-number-format";

interface AddrFieldProps {
    setAddr: React.Dispatch<React.SetStateAction<number | undefined>>;
    Addr: number | undefined;
}

const AddrField = (props: AddrFieldProps) => {

    return (
        <div className="relative h-11 w-full min-w-[200px]">
            <PatternFormat displayType="input" placeholder="XXX-XXX-XX-X" format="###-###-##-#" value={props.Addr} onChange={(e) => props.setAddr(+e.target.value)}
                className="peer h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        </div>
    )
}

export default AddrField;