import Balance from "../../components/balance"
import ReceiverCard from "./_components/receiver"

const Transfer = () => {
    const favoriteList = []
    const contactList = []
    return (
        <div className="flex flex-col mx-6 mt-8 mb-6 font-rubik">
            <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
            <div className="text-medium text-lg text-[#8B9193]">Favourite</div>
            <div className="flex justify-between items-center my-4">
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
            </div>

            <div className="text-medium text-lg text-[#8B9193]">From</div>
            <div className="my-6">
            <Balance />
            </div>
            <div className="text-medium text-lg text-[#8B9193] mb-6">To</div>
            <div className="flex justify-between items-center flex-wrap gap-y-4">
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
                <ReceiverCard />
            </div>

        </div>
    )
}

export default Transfer