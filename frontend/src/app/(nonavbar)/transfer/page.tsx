"use client"

import { useState } from "react"

import Balance from "../../components/balance"
import ReceiverCard from "./_components/receiver"
import AddrField from "./_components/addrField"

const Transfer = () => {
    const [receiver, setReceiver] = useState("")
    const favoriteList = [
        {
            name: "Mix Humlek",
            img: "/contact/mix.png",
            addr: "123-456-78-9"
        },
        {
            name: "Ming Humyai",
            img: "/contact/mix.png",
            addr: "123-456-78-1"
        },
        {
            name: "Ming Humju",
            img: "/contact/mix.png",
            addr: "123-456-78-2"

        },
        {
            name: "Ming Humtung",
            img: "/contact/mix.png",
            addr: "123-456-78-3"
        },
    ]
    return (
        <div className="flex flex-col mx-6 mt-8 mb-6 font-rubik">
            <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
            <div className="text-medium text-lg text-[#8B9193]">Favourite</div>
            <div className="flex justify-between items-center my-4">
                {/* <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard /> */}
                {
                    favoriteList.map((item, index) => (
                        <button key={index} onClick={() => setReceiver(item.addr)} >
                        <ReceiverCard img={item.img} />
                        </button>
                    ))
                }
            </div>

            <div className="text-medium text-lg text-[#8B9193]">From</div>
            <div className="my-6">
                <Balance />
            </div>
            <div className="text-medium text-lg text-[#8B9193] mb-2">To</div>
            <AddrField setAddr={setReceiver} Addr={receiver} />



        </div>
    )
}

export default Transfer