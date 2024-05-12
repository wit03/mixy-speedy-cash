"use client"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link";
import { NumericFormat, PatternFormat } from "react-number-format";

export default function page({

}:{
    
})  {
    const {customerState}:CustomerContextType = useCustomer?.()!;

return (

    <div className="flex flex-col gap-12"> 
        <div className="w-full bg-sky-200 rounded-b-3xl p-8 flex flex-col gap-4">
            <div className="flex justify-between">
                <Link href="/loan" aria-label="Back to Home Page">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
                </Link>
                <h6 className="text-2xl font-medium text-gray-800">Loan Application</h6>
                <p></p>
            </div>
            <div className="grid gap-2 bg-white mx-auto w-2/3 p-4 rounded-lg mt-4">
                <h6 className="text-lg font-normal text-gray-600">{customerState.customer?.firstName + " " + customerState.customer?.lastName}</h6>
                <h6 className="text-xl font-medium text-gray-800">{customerState.account?.accountId.slice(0, 3)}-{customerState.account?.accountId.slice(3, 6)}-{customerState.account?.accountId.slice(6)}</h6>
            </div>
        </div>

        <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
                <h6 className="text-xl font-medium text-gray-600">Total Amount</h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <NumericFormat 
                    displayType="input" 
                    placeholder="" thousandSeparator="," 
                    readOnly
                    value={"50000"}
                    suffix=" THB" 
                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <h6 className="text-xl font-medium text-gray-600">Interest</h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <NumericFormat 
                    displayType="input" 
                    placeholder="" thousandSeparator="," 
                    readOnly
                    value={"3"}
                    suffix=" %" 
                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>
            </div>
          
            <div className="flex flex-col gap-2">
                <h6 className="text-xl font-medium text-gray-600">Tenure</h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <NumericFormat 
                    displayType="input" 
                    placeholder="" thousandSeparator="," 
                    readOnly
                    value={"6"}
                    suffix=" months"
                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>
            </div>

            <div className="mx-auto w-[317px] p-4  bg-indigo-400/20 rounded-[3px] border border-black" >
                <h6 className="text-xl font-medium text-gray-600">Monthly Installment</h6>

                <div className="flex justify-end items-center gap-2">
                    <h6 className="text-3xl font-medium text-gray-600">100</h6>
                    <h6 className="text-base font-medium text-gray-600">THB</h6>
                </div>
            </div>
            <button type="button"
             className="mx-auto w-2/3 relative h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block">
                <Link href="/loan/normal/confirm">
                Confirm
                </Link>
            </button>
        </div>

    </div>

    )

}
