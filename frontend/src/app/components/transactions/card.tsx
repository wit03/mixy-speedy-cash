//TODO: Date format

interface TransactionCardProps {
    name: string;
    date: string;
    amount: number;
    transactionType: string;
}

const TransactionCard = (props: TransactionCardProps) => {
    return (
        <div className="flex bg-white rounded-2xl p-4 text-base font-medium w-full items-center justify-between">
            <div className="flex flex-col">
                <div>{props.name}</div>
                <div className="text-sm font-light text-[#858585]">{props.date}</div>
            </div>
            <div className={props.transactionType === "deposit" ? "text-green-500" : "text-red-500"}>{props.transactionType === "deposit" ? "+ " : "- "}{props.amount.toLocaleString('en-US', {minimumFractionDigits: 2})} ฿</div>
        </div>
    )
}

export default TransactionCard;