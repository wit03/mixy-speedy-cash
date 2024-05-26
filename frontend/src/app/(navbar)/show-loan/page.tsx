"use client"
import { makeRequest } from "@/hook/makeRequets";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import { formatTime } from "@/utils/convertTime";
import Link from "next/link";
import { useEffect, useState } from "react";


interface LoanPayment {
    loanId:                string;
    loanType:              string;
    loanAmount:            number;
    interestRate:          number;
    loanStatus:            string;
    endDate:               null | string;
    startDate:             null | string;
    responsibleEmployeeId: null | string;
}



export default function page({

}:{
    
})  {
    const { customerState }: CustomerContextType = useCustomer?.()!;

    const [state, setState] = useState<{loans: LoanPayment[]}>({
        loans: []
    })

    async function handleGetAllLoanPayment() {
        const { data, error, status } = await makeRequest<{
            msg:          string;
            loans:LoanPayment[];
        }>("http://localhost:3000/loan/list-loans", {
            method: "GET",
        })

        if(data?.loans){
            setState(prev => ({...prev, loans: data.loans}))
        }

    }

    useEffect(() => {
      handleGetAllLoanPayment()
    }, [])
    

return (

    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center w-full bg-[#A694CF] rounded-b-3xl p-8">
            <h6 className="font-rubik text-2xl text-white font-medium">My Personal Loan</h6>
        </div>

        <div className="bg-white  lg:w-2/3 lg:mx-auto flex justify-center flex-col mx-4 lg:m-0 p-3 lg:p-6">
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M15 22L13.59 23.41L16.17 26H4V8H2V26C2 27.103 2.897 28 4 28H16.17L13.59 30.59L15 32L20 27L15 22Z" fill="#A694CF"/>
                    <path d="M11 17C11.5523 17 12 16.5523 12 16C12 15.4477 11.5523 15 11 15C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17Z" fill="#A694CF"/>
                    <path d="M24 20H8C6.897 20 6 19.103 6 18V14C6 12.897 6.897 12 8 12H24C25.103 12 26 12.897 26 14V18C26 19.103 25.103 20 24 20ZM8 14V18H24V14H8Z" fill="#A694CF"/>
                    <path d="M28 4H15.83L18.41 1.41L17 0L12 5L17 10L18.41 8.59L15.83 6H28V24H30V6C30 4.898 29.103 4 28 4Z" fill="#A694CF"/>
                </svg>
                <div className="flex flex-col gap-2">
                    <h6 className="text-xl font-normal text-gray-800">Personal Loan</h6>
                    <h6 className="text-lg font-normal text-gray-600">Loan ID</h6>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <div className="flex flex-col gap-2">
                    <h6 className="text-lg font-normal text-gray-600">Debt Balance</h6>
                    <h6 className="text-2xl font-medium text-gray-800">{customerState.account?.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</h6>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-4 p-4">
            <h6 className="text-xl font-normal text-gray-800">Schedule to be paid</h6>
            <div className="flex flex-col  gap-4">
               <div className="flex flex-col gap-4">
                {state.loans.map((item, i) => (
                    <div className="flex gap-3 justify-around p-4 bg-white" key={i}>
                   
                    <div className="flex flex-col gap-0.5">
                        <h6 className="text-sm font-normal text-gray-400">LoanID: {item.loanId}</h6>
                        <h6 className="text-sm font-normal text-gray-800">Priciple loan amount</h6>
                        <h6 className="text-lg font-normal text-[#9747FF]">{item.loanAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</h6>
                        {item.endDate && <h6 className="text-sm font-normal text-gray-600">Due date at {formatTime(item.endDate)}</h6>}
                    </div>
   
                    <Link
                    href={`/show-loan/${item.loanId}`}
                    className="p-4 border border-[#A694CF] hover:bg-purple-600 hover:text-white text-gray-800 rounded-md self-center">
                        <h6 className="text-xl font-normal ">Pay</h6>
                    </Link>
   
                </div>
                ))}
               </div>
            </div>
        </div>

    </div>

    )

}
