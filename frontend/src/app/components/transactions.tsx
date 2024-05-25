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
    const transaction = [
        { id: 1, name: 'John Doe', amount: 1000, date: '2021-09-01', transactionType: 'deposit' },
        { id: 2, name: 'Jane Doe', amount: 2000, date: '2021-09-02', transactionType: 'withdraw' },
        { id: 3, name: 'John Doe', amount: 3000, date: '2021-09-03', transactionType: 'deposit' },
        { id: 4, name: 'Jane Doe', amount: 4000, date: '2021-09-04', transactionType: 'withdraw' },
        { id: 5, name: 'John Doe', amount: 5000, date: '2021-09-05', transactionType: 'deposit' },
        { id: 6, name: 'John Doe', amount: 1000, date: '2021-09-01', transactionType: 'deposit' },
        { id: 7, name: 'Jane Doe', amount: 2000, date: '2021-09-02', transactionType: 'withdraw' },
        { id: 8, name: 'John Doe', amount: 3000, date: '2021-09-03', transactionType: 'deposit' },
        { id: 9, name: 'Jane Doe', amount: 4000, date: '2021-09-04', transactionType: 'withdraw' },
        { id: 10, name: 'John Doe', amount: 5000, date: '2021-09-05', transactionType: 'deposit' },
    ]

    return (
        <div className="w-full z-10 flex flex-col">
            <h1 className="text-sm font-medium text-[#858585] my-6">Recent Transactions</h1>
            <div className="flex flex-col gap-y-4">
                {transactions.map((item, i) => (
                    <TransactionCard key={i} name={item.transactionId} amount={item.amount} date={item.transactionDate} transactionType={item.sender === accountId ? "withdraw" : "deposit"} />
                ))}
                {/* {transaction
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 8)
                    .map((t) => (
                        <TransactionCard key={t.id} name={t.name} amount={t.amount} date={t.date} transactionType={t.transactionType} />
                    ))
                } */}
            </div>
            <Link className="bg-white mt-6 px-4 py-2 rounded-full mx-auto shadow-sm" href="/transactions">
                view more
            </Link>
        </div>
    )
}

export default Transactions;