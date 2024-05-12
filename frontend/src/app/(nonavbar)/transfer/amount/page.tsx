"use client"
import PinField from "react-pin-field";

import { useEffect, useState } from "react"
import Link from "next/link" 

import Balance from "../../../components/balance"
import ReceiverCard from "../_components/receiver"
import AddrField from "../_components/addrField"
import AmountField from "../_components/amountField"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'
import toast from "react-hot-toast"
import { makeRequest } from "@/hook/makeRequets"

const Transfer = () => {
    const searchParams = useSearchParams()
    const reciever = searchParams.get('reciever')
    const [Amount, setAmount] = useState<string>()
    const [pin, setPin] = useState<string>()
    const [step, setStep] = useState<"amount" | "pin">("amount")
    const {customerState}:CustomerContextType = useCustomer?.()!;

    const router = useRouter()

    if(!customerState.account || !customerState.customer){
        router.push("/")
    }
    
    async function TransferMoney() {
        const {data, error, status} = await makeRequest<{msg:string}>("http://localhost:3000/transfer/transfer-balance", {
            method:"POST",
            data:{
                reciever:reciever?.replace("-", ""),
                amount: Amount?.replace(",", ""),
                pin: "123456"
            }
        })

        if(!data || error || status !== 200){
            toast.error("Failed to get loans data")
            return
        }

        // setState(prev => ({...prev, 
        //     loans:{
        //         "decline": data.loans.decline || [],
        //         "inDebt": data.loans.inDebt || [],
        //         "onProcess": data.loans.onProcess || [],
        //         "waiting": data.loans.waiting || []
        //     },
        // }))
    }

    console.log(step
        )


    return (
       <>
      {step === "amount" && 
    <div className="flex flex-col justify-between mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)]">
        <div className="flex flex-col">
            <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
            <div className="text-medium text-lg text-[#8B9193]">From</div>
            <div className="my-4">
            <Balance
                account={customerState.account!}
                customer={customerState.customer!}                
                />
            </div>
            <div className="text-medium text-lg text-[#8B9193] mb-4">To</div>

            <div className="w-full bg-white rounded-2xl text-center py-16">
                Receiver Card
            </div>

            <div className="text-medium text-lg text-[#8B9193] mt-4">Amount</div>
            <AmountField setAmount={setAmount} Amount={Amount} />

        </div>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
                <Link className="bg-[#CB6F6F] text-white text-lg font-medium p-2 rounded-full" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Link>
                <div className="ml-2 text-lg">Cancel</div>
            </div>
            <div 
            onClick={() => {
                if(!Amount){
                    toast.error("You need to give an amount first")
                }
                else {
                    setStep("pin")
                }
            }}
            className="flex items-center cursor-pointer ">
                <div 
                className="mr-2 text-lg text-gray-800">Continue</div>
                <button className="bg-green-600 hover:bg-green-600/90 text-white text-lg font-medium p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
      }

      {step === "pin" && 
      <div className="">
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="relative ">
                <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                    <circle cx="55" cy="55" r="53.5" fill="#F5F5F5" stroke="#87D2F8" strokeWidth="3"/>
                </svg>
                <div className="absolute top-[1.4rem] left-[1.37rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="68" height="65" viewBox="0 0 68 65" fill="none">
                        <path d="M17.4315 59.377C15.9127 59.377 14.613 58.8524 13.5324 57.8034C12.4518 56.7543 11.9105 55.4916 11.9087 54.0154V27.2077C11.9087 25.7333 12.4499 24.4716 13.5324 23.4225C14.6149 22.3734 15.9146 21.848 17.4315 21.8462H20.1929V16.4847C20.1929 12.7763 21.5396 9.61563 24.2329 7.00278C26.9262 4.38992 30.1819 3.0826 34 3.08081C37.8181 3.07903 41.0748 4.38635 43.7699 7.00278C46.465 9.61921 47.8108 12.7798 47.8071 16.4847V21.8462H50.5685C52.0873 21.8462 53.3879 22.3716 54.4704 23.4225C55.5529 24.4734 56.0932 25.7351 56.0913 27.2077V54.0154C56.0913 55.4899 55.551 56.7525 54.4704 57.8034C53.3898 58.8542 52.0891 59.3788 50.5685 59.377H17.4315ZM34 45.9731C35.5188 45.9731 36.8194 45.4486 37.9019 44.3995C38.9844 43.3504 39.5247 42.0878 39.5228 40.6116C39.521 39.1354 38.9807 37.8736 37.9019 36.8263C36.8231 35.7791 35.5225 35.2536 34 35.25C32.4776 35.2465 31.1778 35.7719 30.1009 36.8263C29.0239 37.8808 28.4827 39.1425 28.4772 40.6116C28.4717 42.0806 29.0129 43.3433 30.1009 44.3995C31.1889 45.4557 32.4886 45.9803 34 45.9731ZM25.7158 21.8462H42.2843V16.4847C42.2843 14.2507 41.4788 12.3518 39.868 10.788C38.2572 9.22424 36.3012 8.44235 34 8.44235C31.6988 8.44235 29.7428 9.22424 28.132 10.788C26.5212 12.3518 25.7158 14.2507 25.7158 16.4847V21.8462Z" fill="#87D2F8"/>
                    </svg>
                </div>
            </div>
            <h6 className="mt-12 text-2xl text-gray-800 font-medium">
            Please fill up your pin
            </h6>
        </div>

        <div className="flex flex-col gap-4 mt-20">
            <div className="flex items-center mx-auto gap-3">
                <input
                className="h-12 w-12 ps-[12px]
                relative text-gray-a5a5a5 outline-purple-500 text-sm underline decoration-[#a5a5a5] rounded-md bg-[#f5f5f5] border-4 border-solid border-[#8351F433] box-border shadow-md tracking-0.02 font-rubik sm:text-sm focus:ring-purple-600"
                />
              <PinField
              className="h-12 w-12 ps-[12px]
              relative text-gray-a5a5a5 outline-purple-500 text-sm underline decoration-[#a5a5a5] rounded-md bg-[#f5f5f5] border-4 border-solid border-[#8351F433] box-border shadow-md tracking-0.02 font-rubik sm:text-sm focus:ring-purple-600"
              
              />

            </div>
        </div>
      </div>
      }




       </>
    )
}

export default Transfer