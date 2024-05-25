import { AccountData, CustomerData } from "@/provider/CustomerContext";

const Balance = ({
    customer,
    account
}:{
    customer:CustomerData
    account: AccountData
}) => {

    return (
        <div className="bg-white rounded-2xl w-full z-10">
            <div className="py-5 px-3 text-[#333333]">
                <div className="text-sm mb-2">Current Balance</div>
                <div className="text-[28px] font-medium">{account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})} ฿</div>
            </div>
            <div className="bg-gradient-to-r from-[#133FDB] to-[#B7004D4D] rounded-b-2xl text-white px-3 py-5 font-plexMono">
                <div className="text-lg font-semibold">{`${account.accountId.slice(0, 3)}-${account.accountId.slice(3, 6)}-${account.accountId.slice(6)}`}</div>
                <div className=" text-sm">{customer.firstName + " " + customer.lastName}</div>
            </div>
        </div>
    )

}

export default Balance;