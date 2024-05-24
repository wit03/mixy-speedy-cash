"use client"
import AccountInfo from "./_component/AccountInfo";
import PrivacyAndPolicy from "./_component/PrivacyAndPolicy";

const Account = () => {
    return (
        <>
            <div className="overflow-scroll w-screen">
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
                

                <div className="flex m-5 font-rubik justify-between items-center">
                    <div className="flex items-center gap-2 text-[16px]">
                        <div className="rounded-full w-10 h-10 bg-white flex justify-center items-center border-2 border-[#9747FF]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#9747FF" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        Account Information
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <hr className="bg-black" />

                <div className="flex m-5 font-rubik justify-between items-center">
                    <div className="flex items-center gap-2 text-[16px]">
                        <div className="rounded-full w-10 h-10 bg-white flex justify-center items-center border-2 border-[#9747FF]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                            </svg>
                        </div>
                        Loan
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <hr className="bg-black" />

                <div className="flex m-5 font-rubik justify-between items-center">
                    <div className="flex items-center gap-2 text-[16px]">
                        <div className="rounded-full w-10 h-10 bg-white flex justify-center items-center border-2 border-[#9747FF]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>

                        </div>
                        Privacy and Policy
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <hr className="bg-black" />
            </div>
        </>
    )
}

export default Account