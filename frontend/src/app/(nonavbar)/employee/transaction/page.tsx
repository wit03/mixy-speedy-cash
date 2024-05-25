"use client"

import { makeRequest } from "@/hook/makeRequets";
import { formatTime } from "@/utils/convertTime";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export interface Transaction {
    transactionId:   string;
    detail:          string;
    accountReciever: Account;
    accountSender:   Account;
    transactionType: string;
    amount:          number;
    transactionDate: string;
    updatedAt:       string;
}

export interface Account {
    customer: Customer;
}

export interface Customer {
    firstName: string;
    lastName:  string;
}


export interface Untitled1 {
    msg:          string;
    transactions: Transaction[];
}
export default function page({

}:{
    
})  {

    const [state, setState] = useState<{search:string, searchType:"transfer" | "all" | "loan", transactions: Transaction[], transactionId:string}>({
        search:"",
        searchType: "all",
        transactions: [],
        transactionId: "",

    })

    async function GetTransaction() {
        const {data, error} = await makeRequest<{msg:string, transactions:Transaction[]}>(`http://localhost:3000/employee/list-transaction?type=${state.searchType}&search=${state.search}&transactionId=${state.transactionId}`, {
            method:"GET"
        })
        if(!data || !data.transactions || error){
            toast.error("Failed to list employee name")
            return
        }

        setState(prev => ({...prev, transactions: data.transactions}))
    }

    useEffect(() => {
        GetTransaction()
    }, [])


    async function handleSearch() {
        await GetTransaction()
    }

return (

    <> 
            <div className="flex flex-col gap-4 px-10 pt-7">
                <h5 className="text-3xl font-medium">Transaction</h5>
                <div className="grid grid-cols-2 gap-8">
                    <input
                    value={state.search}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, search:e.target.value}))}
                    className="p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal"
                    placeholder="Search for account number"
                    />
                    <select 
                    // @ts-ignore
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({...prev, searchType: e.target.value}))} value={state.searchType}  
                    className="appearance-none outline-none p-2">
                            <option value={"all"}>All</option>
                            <option value={"transfer"}>Transfer</option>
                            <option value={"loan"}>Loan</option>
                    </select>
                </div>

                <input
                    value={state.transactionId}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, transactionId:e.target.value}))}
                    className="p-3 rounded-md outline-purple-300 placeholder:text-sm placeholder:font-normal"
                    placeholder="Search for transactionID"
                    />
                <button 
                onClick={handleSearch}
                className="flex items-center gap-1 bg-purple-400 px-4 py-2 text-white rounded-lg hover:bg-purple-400/80 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19.34 20.6886L13.2579 14.6064C12.7752 14.9926 12.2201 15.2983 11.5925 15.5236C10.965 15.7488 10.2973 15.8615 9.5893 15.8615C7.83546 15.8615 6.35129 15.2539 5.1368 14.0388C3.9223 12.8236 3.31473 11.3394 3.31409 9.58625C3.31344 7.83305 3.92101 6.34888 5.1368 5.13374C6.35258 3.9186 7.83675 3.31104 9.5893 3.31104C11.3419 3.31104 12.8264 3.9186 14.0428 5.13374C15.2592 6.34888 15.8665 7.83305 15.8645 9.58625C15.8645 10.2942 15.7519 10.962 15.5266 11.5895C15.3014 12.217 14.9956 12.7721 14.6095 13.2548L20.6916 19.337L19.34 20.6886ZM9.5893 13.9306C10.7961 13.9306 11.822 13.5084 12.6671 12.664C13.5121 11.8196 13.9343 10.7937 13.9337 9.58625C13.933 8.37884 13.5108 7.35324 12.6671 6.50946C11.8233 5.66569 10.7974 5.24316 9.5893 5.24187C8.38124 5.24058 7.35565 5.66312 6.51252 6.50946C5.66939 7.35581 5.24685 8.38141 5.24492 9.58625C5.24299 10.7911 5.66552 11.817 6.51252 12.664C7.35951 13.511 8.38511 13.9332 9.5893 13.9306Z" fill="white"/>
                </svg>
                <h6 className="text-base font-normal">Search</h6>
                </button>



                <div className="flex flex-col gap-2 mt-4 md:mt-6">
                <h2 className="text-xl font-bold text-start">Decline</h2>
                <div className="w-auto min-w-full mt-2 p-1 relative overflow-x-scroll scrollbar-medium scrollbar-thumb sm:rounded-lg rounded-lg flex flex-shrink-0">
                    <table className="w-full text-left rtl:text-right  overflow-hidden whitespace-nowrap border-collapse border-x border-t">
                        <thead className=" bg-slate-100">
                            <tr>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    TransactionId
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Detail
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Sender
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Reciever
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    TransactionType
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    TransactionDate
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                             {state.transactions.length !== 0 && 
                             state.transactions.map((item, i) => (
                                <tr className="bg-white border-b text-slate-800" key={i}>
                                <td scope="row" className="px-3 py-4 font-medium ">
                                    <p className="text-sm font-normal">
                                        {item.transactionId}
                                    </p>
                                </td>
  
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.detail}
                                    </p>
                                </td>
  
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.accountSender.customer.firstName + " " + item.accountSender.customer.lastName}
                                    </p>
                                </td>
  
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.accountReciever.customer.firstName + " " + item.accountReciever.customer.lastName}
                                    </p>
                                </td>
  
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.transactionType}
                                    </p>
                                </td>
  
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.amount}
                                    </p>
                                </td>
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {formatTime(item.transactionDate)}
                                    </p>
                                </td>
                                </tr>
                             ))
                             
                             }
                            
                        </tbody>
                    </table>
                </div>
            </div>






            </div>

    </>

    )

}
