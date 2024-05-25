"use client"
import Link from "next/link"
import TransactionCard from "../../components/transactions/card"
import { useEffect, useState } from "react"
import { makeRequest } from "@/hook/makeRequets"
import { TransactionAccount } from "../page"
import toast from "react-hot-toast"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext"
import { Circular } from "@/app/components/Loading/Circular"

const Transactions = () => {
    const { customerState }: CustomerContextType = useCustomer?.()!;

    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<{ transactions: TransactionAccount[] }>({
        transactions: []
      })
    async function GetTransactions() {
        setLoading(true)
        const { data, error, status } = await makeRequest<{
          msg:          string;
          transactions: TransactionAccount[];
        }>(`http://localhost:3000/transaction/list-transactions?limit=${"1000"}&skip=${"0"}` , {
          method: "GET",
        })
        setLoading(false)
        if (!data || error || status !== 200) {
          if (error?.data.msg) {
              toast.error(error?.data.msg || "Failed to list all transaction in an accounts")
              return
            }
            else {
              toast.error("Failed to list all transaction in an accounts")
              return
            }
        }
        setState(prev => ({...prev, transactions: data.transactions}))
      }
    
    
      useEffect(() => {
        GetTransactions()
      }, [customerState.account])
      
    


    return (
        <div className="flex flex-col mx-6 mt-14 mb-6 font-rubik">
            <Circular
            loading={loading}
            />
            <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            </Link>
            <h1 className="text-3xl font-medium my-4 text-[#333333]">Transactions</h1>
            <div className="flex flex-col gap-y-4">
            {state.transactions.map((item, i) => (
                    <TransactionCard key={i} name={item.transactionId} amount={item.amount} date={item.transactionDate} transactionType={item.sender === customerState.account!.accountId ? "withdraw" : "deposit"} />
                ))}
            </div>
        </div>

    )
}

export default Transactions