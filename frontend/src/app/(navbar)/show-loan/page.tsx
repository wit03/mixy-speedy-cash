"use client"
import { makeRequest } from "@/hook/makeRequets";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import { formatTime } from "@/utils/convertTime";
import Link from "next/link";
import { useEffect, useState } from "react";


interface LoanPayment {
    loanId:               string;
    loanPaymentId:        string;
    scheduledPaymentDate: string;
    principalAmount:      number;
    paymentAmount:        number;
    interestPercent:      number;
    paidAmount:           number;
    paidDate:             null;
    paidStatus:           "paid" | "inDept" | "onProcess";
    createdAt:            string;
}



export default function page({

}:{
    
})  {
    const { customerState }: CustomerContextType = useCustomer?.()!;

    const [state, setState] = useState<{loanPayments: LoanPayment[]}>({
        loanPayments: []
    })

    async function handleGetAllLoanPayment() {
        const { data, error, status } = await makeRequest<{
            msg:          string;
            loanPayments:LoanPayment[];
        }>("http://localhost:3000/loan/list-customer-loan-payments", {
            method: "GET",
        })

        if(data?.loanPayments){
            setState(prev => ({...prev, loanPayments: data.loanPayments}))
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
                {state.loanPayments.map((item, i) => (
                    <div className="flex gap-3 justify-around p-4 bg-white" key={i}>
                    <div className="min-w-[3rem]  min-h-[3rem] relative rounded-full self-center bg-[#E4DFF1]">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12C10.35 12 8.9375 11.4125 7.7625 10.2375C6.5875 9.0625 6 7.65 6 6C6 4.35 6.5875 2.9375 7.7625 1.7625C8.9375 0.5875 10.35 0 12 0C13.65 0 15.0625 0.5875 16.2375 1.7625C17.4125 2.9375 18 4.35 18 6C18 7.65 17.4125 9.0625 16.2375 10.2375C15.0625 11.4125 13.65 12 12 12ZM0 24V19.8C0 18.95 0.219 18.169 0.657 17.457C1.095 16.745 1.676 16.201 2.4 15.825C3.95 15.05 5.525 14.469 7.125 14.082C8.725 13.695 10.35 13.501 12 13.5C13.65 13.499 15.275 13.693 16.875 14.082C18.475 14.471 20.05 15.052 21.6 15.825C22.325 16.2 22.9065 16.744 23.3445 17.457C23.7825 18.17 24.001 18.951 24 19.8V24H0Z" fill="#A694CF"/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h6 className="text-sm font-normal text-gray-800">Amount to be paid</h6>
                        <h6 className="text-lg font-normal text-[#9747FF]">{item.paymentAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</h6>
                        <h6 className="text-sm font-normal text-gray-600">Due date at {formatTime(item.scheduledPaymentDate)}</h6>
                    </div>
   
                    <Link
                    href={`/payloan/${item.loanId}/${item.loanPaymentId}?amount=${item.paymentAmount}`}
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
