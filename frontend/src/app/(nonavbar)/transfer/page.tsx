"use client"

import { useState } from "react"
import Link from "next/link" 

import Balance from "../../components/balance"
import ReceiverCard from "./_components/receiver"
import AddrField from "./_components/addrField"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext"
import { useRouter } from 'next/navigation'
import { makeRequest } from "@/hook/makeRequets"

const Transfer = () => {
    const [receiver, setReceiver] = useState<string | undefined>(undefined)
    const {customerState}:CustomerContextType = useCustomer?.()!;

    const router = useRouter()

    if(!customerState.account || !customerState.customer){
        router.push("/")
        return
    }


    const favoriteList = [
        {
            name: "Mix Humlek",
            img: "/contact/mix.png",
            addr: 123455678
        },
        {
            name: "Ming Humyai",
            img: "/contact/mix.png",
            addr: 123456789
        },
        {
            name: "Ming Humju",
            img: "/contact/mix.png",
            addr: 123154345

        },
        {
            name: "Ming Humtung",
            img: "/contact/mix.png",
            addr: 324254566
        },
    ]
    console.log(receiver);
    
    

    return (
        <div className="flex flex-col justify-between mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)]">
            <div className="flex flex-col">
                <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
                <div className="text-medium text-lg text-[#8B9193]">Favourite</div>
                <div className="flex justify-between items-center my-4">
                    {
                        favoriteList.map((item, index) => (
                            <button key={index} onClick={() => setReceiver(item.addr.toString())} >
                                <ReceiverCard img={item.img} />
                            </button>
                        ))
                    }
                </div>

                <div className="text-medium text-lg text-[#8B9193]">From</div>
                <div className="my-6">
                    <Balance
                    account={customerState.account!}
                    customer={customerState.customer!}                
                    />
                </div>
                <div className="text-medium text-lg text-[#8B9193] mb-2">To</div>
                <AddrField setAddr={setReceiver} Addr={receiver} />
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
                <div className="flex items-center">
                    <div className={`${receiver === undefined || receiver![11] === " " ? "text-gray-400" : "text-gray-800"} mr-2 text-lg `}>Continue</div>
                    <Link 
                    className={`${receiver === undefined || receiver![11] === " " ? "bg-[#B2B2B2]" : " bg-green-600 hover:bg-green-600/90"} text-white text-lg font-medium p-2 rounded-full`} 
                    href={{
                        pathname: "/transfer/amount",
                        query:{
                            receiver: receiver
                        }
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Transfer