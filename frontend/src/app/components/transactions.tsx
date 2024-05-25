//TODO: Fetch transaction data

import Link from "next/link";
import TransactionCard from "./transactions/card";
import { TransactionAccount } from "../(navbar)/page";

const Transactions = ({
    transactions,
    accountId
}:{
    transactions: TransactionAccount[];
    accountId: string;
}) => {
  

    return (
        <div className="w-full z-10 flex flex-col">
            <h1 className="text-sm font-medium text-[#858585] my-6">Recent Transactions</h1>
            <div className="flex flex-col gap-y-4">
                {transactions.length === 0 ? 
                <div className="flex justify-center">
                    <h6 className="text-xl font-medium text-gray-600">You have no transaction yet</h6>
                </div>
                :
               <>
                {transactions.map((item, i) => (
                    <TransactionCard key={i} name={item.transactionId} amount={item.amount} date={item.transactionDate} transactionType={item.sender === accountId ? "withdraw" : "deposit"} />
                ))}
                <Link className="bg-white mt-6 px-4 py-2 rounded-full mx-auto shadow-sm" href="/transactions">
                    view more
                </Link>
               </>
                }
            </div>
        </div>
    )
}

export default Transactions;