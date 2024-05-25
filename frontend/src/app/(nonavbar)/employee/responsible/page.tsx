"use client"
import { Circular } from "@/app/components/Loading/Circular";
import { makeRequest } from "@/hook/makeRequets"
import { formatTime } from "@/utils/convertTime";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

interface Loan {
    accountId:  string;
    loanId:     string;
    loanType:   string;
    loanAmount: number;
    account:    Account;
    createdAt: string;
}

interface Account {
    customer: Customer;
}

interface Customer {
    firstName:   string;
    lastName:    string;
    phoneNumber: string;
    email:       string;
}


export default function page({

}:{
    
})  {

    const [loanData, setLoanData] = useState<Loan[]>([])
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit() {
        setLoading(true)
        const { data, error, status } = await makeRequest<{
            msg:   string;
            loans: Loan[];
        }>("http://localhost:3000/employee/employee-list-loans", {
            method: "GET",
        })
        if(!data?.loans){
            toast.error("Failed to list responsible")
            setLoading(false)
            return
        }
        else {
            setLoanData(prev => data.loans)
            setLoading(false)
        }
    }

    useEffect(() => {
      handleSubmit()
    }, [])
    
    

return (

    <div className="flex flex-col gap-4 px-10 pt-7">
        
        <Circular
        loading={loading}
        />

        {loanData.length === 0 ? 
            <div className="flex flex-col gap-2 mt-4 md:mt-6 items-center">
                <h6 className="text-xl font-medium text-gray-600">You doesn't have a loan to responsible</h6>
            </div>
            :
            <div className="flex flex-col gap-2 mt-4 md:mt-6">
            <h2 className="text-xl font-bold text-start">Your responsible loans</h2>
                <div className="w-auto min-w-full mt-2 p-1 relative overflow-x-scroll scrollbar-medium scrollbar-thumb sm:rounded-lg rounded-lg flex flex-shrink-0">
                    <table className="w-full text-left rtl:text-right  overflow-hidden whitespace-nowrap border-collapse border-x border-t">
                        <thead className=" bg-slate-100">
                            <tr>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Acc Number
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Acc Name
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Requested At
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-4 text-base font-medium text-gray-700 uppercase font-rubik">
                                    Type
                                </th>
                       
                            </tr>
                        </thead>

                        <tbody>
                        {loanData.length !== 0 && loanData.map((item, i) => (
                            <tr className="bg-white border-b text-slate-800" key={i}>
                                <td scope="row" className="px-3 py-4 font-medium ">
                                    <p className="text-sm font-normal">
                                         {item.accountId}
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.account.customer.firstName + " " + item.account.customer.lastName}
                                    </p>
                                </td>
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.account.customer.phoneNumber}
                                    </p>
                                </td>
                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.account.customer.email}
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                    {formatTime(item.createdAt)}
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                          {item.loanAmount}
                                    </p>
                                </td>

                                <td className="px-3 py-4">
                                    <p className="text-sm font-normal">
                                        {item.loanType}
                                    </p>
                                </td>


                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
        }

    </div> 

    )

}
