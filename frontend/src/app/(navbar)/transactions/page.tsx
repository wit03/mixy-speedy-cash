import Link from "next/link"
import TransactionCard from "../../components/transactions/card"

const Transactions = () => {
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
        <div className="flex flex-col mx-6 mt-14 mb-6 font-rubik">
            <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            </Link>
            <h1 className="text-3xl font-medium my-4 text-[#333333]">Transactions</h1>
            <div className="flex flex-col gap-y-4">
            {transaction
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((t) => (
                        <TransactionCard key={t.id} name={t.name} amount={t.amount} date={t.date} transactionType={t.transactionType} />
                    ))
            }
            </div>
        </div>

    )
}

export default Transactions