"use client";

import { makeRequest } from "@/hook/makeRequets";
import toast from "react-hot-toast";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/convertTime";

interface LoanPaymentType {
    loanId: string;
    loanPaymentId: string;
    scheduledPaymentDate: string | null;
    principalAmount: number;
    paymentAmount: number;
    interestPercent: number;
    paidAmount: number;
    paidDate: string | null;
    paidStatus: string;
    createdAt: string;
}

export default function page({
    
}:{
    
})  {

    const params = useParams<{ id:string }>()

    const [state, setState] = useState<{loanPayments:LoanPaymentType[]}>({
        loanPayments: []
    })

    async function GetLoanData() {
        const {data, error, status} = await makeRequest<{msg:string, loanPayments: LoanPaymentType[]}
        >(`http://localhost:3000/employee/list-loan-payments?loanId=${params.id}`, {
            method:"GET",
        })

        if(!data || !data.loanPayments || error || status !== 200){
            toast.error("Failed to get loans data")
            return
        }

        console.log(data.loanPayments)
        setState(prev => ({...prev, loanPayments: data.loanPayments}))

    }

    useEffect(() => {
        GetLoanData()
    }, [])
    

    

    return (

    <div className="flex flex-col gap-4 px-10 pt-7">
        <h5 className="text-2xl font-semibold mb-4">History Loan Payments {params.id}</h5>

        {state.loanPayments.length !== 0 ? 
        state.loanPayments.map((item, i) => (
            <div key={i} className="flex bg-white rounded-2xl p-4 text-base font-medium w-full items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <h6 className="text-sm font-normal text-gray-500">Loan PaymentId : </h6>
                        <h6 className="text-sm font-normal">{item.loanPaymentId}</h6>
                    </div>
                    <div className="flex gap-1 items-center">
                        <h6 className="text-sm font-normal text-gray-500">Principal Amount : </h6>
                        <h6 className="text-sm font-normal">{item.principalAmount}</h6>
                    </div>
                    <div className="flex gap-1 items-center">
                        <h6 className="text-sm font-normal text-gray-500">Interest : </h6>
                        <h6 className="text-sm font-normal">{item.interestPercent}</h6>
                    </div>
                    <div className="flex gap-1 items-center">
                        <h6 className="text-sm font-normal text-gray-500">PaidStatus : </h6>
                        <h6 className="text-sm font-normal">{item.paidStatus}</h6>
                    </div>
                    {item.scheduledPaymentDate && 
                    <div className="flex gap-1 items-center">
                        <h6 className="text-sm font-normal text-gray-500">ScheduledPaymentDate : </h6>
                        <h6 className="text-sm font-normal">{formatTime(item.scheduledPaymentDate)}</h6>
                    </div>
                    }
                    <div className="text-sm font-light text-gray-500">{formatTime(item.createdAt)}</div>
                </div>

                <div className={`${item.paidDate !== null ? "text-green-500" : "text-red-500"}  text-xl font-medium `}>{item.paymentAmount}</div>
            </div>
        ))
        :
        <div className="">

        </div>
        }
    </div>
    )

}
