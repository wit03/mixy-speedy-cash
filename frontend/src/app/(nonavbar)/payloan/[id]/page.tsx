"use client"
import AmountField from "@/app/(nonavbar)/transfer/_components/amountField"
import Balance from "@/app/components/balance"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link"
import { useState } from "react";

export default function page({

}:{
    
})  {

    const { customerState }: CustomerContextType = useCustomer?.()!;
    const [amount, setAmount] = useState<string>()

    return (

    <> 
       <div className="flex flex-col justify-between mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)] z-50">
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

                        {/* {recieverData && 
                        <div className="flex flex-col gap-4 w-full bg-white rounded-2xl text-center py-16">
                            <h6 className="text-xl font-medium text-gray-800">{recieverData.accountId.slice(0, 3)}-{recieverData.accountId.slice(3, 6)}-{recieverData.accountId.slice(6)}</h6>
                            <h6 className="text-xl font-medium text-gray-800">{recieverData.customer.firstName + " " + recieverData.customer.lastName}</h6>
                        </div>
                        
                        } */}

                        <div className="text-medium text-lg text-[#8B9193] mt-4">Amount</div>
                        <AmountField setAmount={setAmount} Amount={amount} />

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
                                // if (!Amount) {
                                //     toast.error("You need to give an amount first")
                                // }
                                // else {
                                //     setStep("pin")
                                // }
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
    </>

    )

}
