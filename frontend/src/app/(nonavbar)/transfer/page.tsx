"use client"

import { useState } from "react"
import Link from "next/link" 
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Balance from "../../components/balance"
import ReceiverCard from "./_components/receiver"
import AddrField from "./_components/addrField"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext"
import { useRouter } from 'next/navigation'
import { makeRequest } from "@/hook/makeRequets"
import toast from "react-hot-toast"
import { Circular } from "@/app/components/Loading/Circular"

interface Account {
    accountId: string;
    customer:  Customer;
}

interface Customer {
    firstName:   string;
    lastName:    string;
    phoneNumber: string;
}

const Transfer = () => {
    const [reciever, setReceiver] = useState<string | undefined>("718108911")
    const {customerState}:CustomerContextType = useCustomer?.()!;
    const [contact, setContact] = useState<Account[] | undefined>(
        // [
        //     {
        //         "accountId": "1714642325252",
        //         "customer": {
        //             "firstName": "mix",
        //             "lastName": "jateassavapirom",
        //             "phoneNumber": "0948652696"
        //         }
        //     },
        //     {
        //         "accountId": "1714642331084",
        //         "customer": {
        //             "firstName": "mix",
        //             "lastName": "jateassavapirom",
        //             "phoneNumber": "0948652696"
        //         }
        //     }
        // ]
        undefined
    )
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
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
    
    async function handleGetContact() {
        setOpen(true)
        setLoading(true)
        const {data, error, status} = await makeRequest
        <{
            msg:      string;
            accounts: Account[];
        }>
        ("http://localhost:3000/account/list-accounts", {
            method:"GET",
        })
        
        if(!data?.accounts || error || status !== 200){
            toast.error(data?.msg || "Failde to list all account")
            setLoading(false)
        }
        else {
            setContact(data.accounts)
            setLoading(false)
        }
    }


    return (
       <>

        <Circular
        loading={loading}
        />

        {/* Dialog Contact */}
        <Transition appear show={open}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={(val) => setOpen(val)}>
            <div className="fixed inset-0 bg-black/25" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                >
                    <DialogPanel className="max-h-screen overflow-y-auto w-full max-w-md rounded-xl p-6 bg-white">
                    <DialogTitle as="div" className="flex justify-between text-xl font-medium text-gray-800">
                        <h6>Contact</h6>
                        <h6 className="cursor-pointer" onClick={() => setOpen(false)}>X</h6>
                    </DialogTitle>
                    <div className="flex flex-col gap-2 p-1">
                        {contact && contact.map((item, i) => (
                            <div 
                            key={i}
                            onClick={() => {
                                setReceiver(item.accountId)
                                setOpen(false)
                            }}
                            className="flex flex-col border p-4 rounded-lg">
                            <h6 className="text-lg font-normal text-gray-800">{item.accountId.slice(0, 3)}-{item.accountId.slice(3, 6)}-{item.accountId.slice(6)}</h6>
                                <h6 className="text-lg font-normal text-gray-600">{item.customer.firstName + " " + item.customer.lastName}</h6>

                            </div>
                        ))}
                    </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </Dialog>
        </Transition>

     
        <div className="flex flex-col justify-between mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)] relative">

            <div className="flex flex-col">
                <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
                <div className="flex items-center justify-between">
                    <h6 className="text-medium text-lg text-[#8B9193]">Favourite</h6>
                    <div 
                    onClick={handleGetContact}
                    className="
                   bg-gradient-to-r from-[#a6c1ee] to-[rgba(127,84,222,0.2)] hover:opacity-90 rounded-lg px-4 py-2 cursor-pointer
                    text-medium text-lg text-white">
                        All Contact
                    </div>

                </div>
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
                <AddrField setAddr={setReceiver} Addr={reciever} />
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
                    <div className={`${reciever === undefined || reciever![11] === " " ? "text-gray-400" : "text-gray-800"} mr-2 text-lg `}>Continue</div>
                    <Link 
                    className={`${reciever === undefined || reciever![11] === " " ? "bg-[#B2B2B2]" : " bg-green-600 hover:bg-green-600/90"} text-white text-lg font-medium p-2 rounded-full`} 
                    href={{
                        pathname: "/transfer/amount",
                        query:{
                            reciever: reciever
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
       </>
    )
}

export default Transfer