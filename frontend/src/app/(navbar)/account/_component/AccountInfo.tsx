"use client"
const AccountInfo = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-8 left-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

                <div className="flex-col bg-[#A694CF] w-full h-[20rem] flex justify-center items-center font-rubik text-2xl font-bold gap-2.5">
                    My account
                    <div className="rounded-full w-36 h-36 bg-white flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#9747FF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-28">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <div className="text-[20px] font-normal gap-2.5">
                        Chitsanupong Jet
                    </div>
                    <div className="text-[16px] font-normal -mt-2.5">
                        Account ID
                    </div>
                </div>

                <div className="flex-col m-5 font-rubik text-lg">
                    <div className="flex items-center w-full justify-between">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="h-10 w-72 ml-2 rounded-md border-2 border-[#A694CF]"
                        />
                    </div>

                    <div className="flex items-center w-full justify-between mt-5">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="h-10 w-72 ml-2 rounded-md border-2 border-[#A694CF]"
                        />
                    </div>

                    <div className="flex items-center w-full justify-between mt-5">
                        <label htmlFor="phone">Phone number</label>
                        <input
                            type="tel"
                            className="h-10 ml-2 rounded-md border-2 border-[#A694CF]"
                        />
                    </div>

                    <div className="flex items-center w-full justify-between mt-5">
                        <label htmlFor="accountType">Account Type</label>
                        <input
                            type="text"
                            className="h-10 ml-2 rounded-md border-2 border-[#A694CF]"
                        />
                    </div> 
                </div>

                <div className="flex justify-center items-center mt-24">
                    <button className="self-center w-24 h-10 rounded-md bg-gray-300 border border-black">Log Out</button>
                </div>
        </>
    )
}

export default AccountInfo