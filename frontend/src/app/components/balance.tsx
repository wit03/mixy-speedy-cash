const Balance = () => {
    const balance =123456.15

    return (
        <div className="bg-white rounded-2xl w-full mt-6 z-10">
            <div className="py-5 px-3 text-[#333333]">
                <div className="text-sm mb-2">Current Balance</div>
                <div className="text-[28px] font-medium">{balance.toLocaleString('en-US', {minimumFractionDigits: 2})} ฿</div>

            </div>
            <div className="bg-gradient-to-r from-[#133FDB] to-[#B7004D4D] rounded-b-2xl text-white px-3 py-5 font-plexMono">
                <div className="text-lg font-semibold">156-278-1455</div>
                <div className=" text-sm">Jarukit Jintanasathirakul</div>
            </div>
        </div>
    )

}

export default Balance;