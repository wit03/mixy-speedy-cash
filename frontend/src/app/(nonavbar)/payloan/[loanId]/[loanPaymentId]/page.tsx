"use client"
import Balance from "@/app/components/balance"
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link"
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { NumericFormat } from "react-number-format";
import PinField from "react-pin-field";
import { makeRequest } from "@/hook/makeRequets";
import toast from "react-hot-toast";
import { formatTime } from "@/utils/convertTime";

interface LoanPayment {
    loanPaymentId: string;
    loanId: string;
    paidAmount: number;
    paidDate: string;
    paidStatus: string;
}

interface Transaction {
    transactionId: string;
    detail: string;
    sender: string;
    reciever: string;
    transactionType: string;
    amount: number;
    transactionDate: string;
    updatedAt: string;
}


export default function page({

}: {

}) {
    const { loanId, loanPaymentId } = useParams<{ loanId: string, loanPaymentId: string }>()
    const searchParams = useSearchParams()
    const amountPayment = searchParams.get("amount")
    const { customerState, LoadData }: CustomerContextType = useCustomer?.()!;
    const pinRef: React.MutableRefObject<null> = useRef(null)
    const [state, setState] = useState<{
        step: string;
        pin: string;
        pinIndex: number;
        resLoan: null | {
            loanPayment: LoanPayment;
            transaction: Transaction;
        };
    }>({
        step: "initial",
        pin: "",
        pinIndex: 0,
        resLoan: null
    })


    async function handlePressPinByMouse(value: number) {
        if (state.pinIndex <= 5) {
            //@ts-ignore
            pinRef.current[state.pinIndex].value = value
            if (state.pinIndex + 1 === 6) {
                let pin = ""
                //@ts-ignore
                pinRef.current.forEach(input => (pin = pin + input.value));
                //@ts-ignore
                pinRef.current.forEach(input => (input.value = ""));
                await TransferMoney(pin)
                setState(prev => ({ ...prev, pinIndex: 0 }))
            }
            else {
                setState(prev => ({ ...prev, pinIndex: prev.pinIndex + 1 }))
            }
        }
    }

    async function TransferMoney(pin: string) {
        const { data, error, status } = await makeRequest<{
            msg: string;
            loanPayment: LoanPayment;
            transaction: Transaction;
        }>("http://localhost:3000/loan/pay-loan", {
            method: "PATCH",
            data: {
                loanId: loanId,
                loanPaymentId: loanPaymentId,
                pin: pin
            }
        })
        if (!data || error || status !== 200) {
            if (error?.data.msg) {
                toast.error(error?.data.msg || "Failed to pay loan, fill pin again")
            }
            else {
                toast.error("Failed to pay loan, fill pin again")
            }
            return
        }
        setState(prev => ({ ...prev, step: "success", resLoan: {loanPayment: data.loanPayment, transaction:data.transaction} }))
        await LoadData()
        toast.success("Paid Loan Success")
    }



    return (

        <>
            {state.step === "initial" &&
                <div className="flex flex-col justify-between mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)] z-50">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">Transfer</h1>
                        <div className="text-medium text-lg text-[#8B9193]">From</div>
                        <div className="my-4">
                            <Balance
                                account={customerState.account!}
                                customer={customerState.customer!}
                            />
                        </div>
                        <div className="text-medium text-lg text-[#8B9193] mb-4">To</div>

                        <div className="py-5 px-3 text-[#333333] bg-white rounded-2xl">
                            <div className="text-sm mb-2 text-gray-700">LoanID : {loanId}</div>
                            <div className="text-sm mb-2 text-gray-700">Loan Payment ID : {loanPaymentId}</div>
                        </div>

                        <div className="text-medium text-lg text-[#8B9193] mt-4">Amount</div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <NumericFormat displayType="input" suffix=" THB" placeholder="" thousandSeparator="," value={amountPayment} readOnly
                                className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Link className="bg-[#CB6F6F] text-white text-lg font-medium p-2 rounded-full" href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </Link>
                            <div className="ml-2 text-lg">Cancel</div>
                        </div>
                        <div
                            onClick={() => {
                                setState(prev => ({ ...prev, step: "pin" }))
                            }}
                            className="flex items-center cursor-pointer ">
                            <div
                                className="mr-2 text-lg text-gray-800">Continue</div>
                            <button className="bg-green-600 hover:bg-green-600/90 text-white text-lg font-medium p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            }

            {state.step === "pin" &&
                <div className="">
                    <div className="flex flex-col items-center justify-center mt-12">
                        <div className="relative ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                                <circle cx="55" cy="55" r="53.5" fill="#F5F5F5" stroke="#87D2F8" strokeWidth="3" />
                            </svg>
                            <div className="absolute top-[1.4rem] left-[1.37rem]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="65" viewBox="0 0 68 65" fill="none">
                                    <path d="M17.4315 59.377C15.9127 59.377 14.613 58.8524 13.5324 57.8034C12.4518 56.7543 11.9105 55.4916 11.9087 54.0154V27.2077C11.9087 25.7333 12.4499 24.4716 13.5324 23.4225C14.6149 22.3734 15.9146 21.848 17.4315 21.8462H20.1929V16.4847C20.1929 12.7763 21.5396 9.61563 24.2329 7.00278C26.9262 4.38992 30.1819 3.0826 34 3.08081C37.8181 3.07903 41.0748 4.38635 43.7699 7.00278C46.465 9.61921 47.8108 12.7798 47.8071 16.4847V21.8462H50.5685C52.0873 21.8462 53.3879 22.3716 54.4704 23.4225C55.5529 24.4734 56.0932 25.7351 56.0913 27.2077V54.0154C56.0913 55.4899 55.551 56.7525 54.4704 57.8034C53.3898 58.8542 52.0891 59.3788 50.5685 59.377H17.4315ZM34 45.9731C35.5188 45.9731 36.8194 45.4486 37.9019 44.3995C38.9844 43.3504 39.5247 42.0878 39.5228 40.6116C39.521 39.1354 38.9807 37.8736 37.9019 36.8263C36.8231 35.7791 35.5225 35.2536 34 35.25C32.4776 35.2465 31.1778 35.7719 30.1009 36.8263C29.0239 37.8808 28.4827 39.1425 28.4772 40.6116C28.4717 42.0806 29.0129 43.3433 30.1009 44.3995C31.1889 45.4557 32.4886 45.9803 34 45.9731ZM25.7158 21.8462H42.2843V16.4847C42.2843 14.2507 41.4788 12.3518 39.868 10.788C38.2572 9.22424 36.3012 8.44235 34 8.44235C31.6988 8.44235 29.7428 9.22424 28.132 10.788C26.5212 12.3518 25.7158 14.2507 25.7158 16.4847V21.8462Z" fill="#87D2F8" />
                                </svg>
                            </div>
                        </div>
                        <h6 className="mt-12 text-2xl text-gray-800 font-medium">
                            Please fill up your pin
                        </h6>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mt-20">
                        <div className="flex items-center mx-auto gap-3">
                            <PinField
                                className="h-12 w-12
                                text-3xl text-gray-800 font-bold
                                relative text-center outline-purple-500 decoration-[#a5a5a5] rounded-md bg-[#f5f5f5] border-4 border-solid border-[#8351F433] box-border shadow-md tracking-0.02 focus:ring-purple-600"
                                ref={pinRef}
                                length={6}
                                validate={/^[0-9]$/}
                                type="password"
                                onChange={(code) => {
                                    setState(prev => ({ ...prev, pinIndex: prev.pinIndex + 1 }))
                                }}
                                format={k => k.toUpperCase()}
                            // onComplete={() => setCompleted(true)}
                            />

                        </div>
                        <div className="grid grid-cols-3 items-center gap-8 mt-12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => (
                                <button
                                    onClick={() => handlePressPinByMouse(item)}
                                    key={i}
                                    className="hover:bg-gray-50/45 border-3 border-solid border-[#fbc2eb] bg-gray-50 rounded-full border w-16 h-16 text-center self-center">
                                    <h6 className="text-xl font-medium text-gray-800">{item}</h6>
                                </button>
                            ))}
                            <button>
                            </button>

                            <button
                                className="
                            flex items-center content-center justify-center
                            hover:bg-gray-50/45 border-3 border-solid border-red-500 bg-gray-50 rounded-full border w-16 h-16 "
                                onClick={() => {
                                    if (state.pinIndex >= 1 && state.pinIndex < 6) {
                                        //@ts-ignore
                                        pinRef.current[state.pinIndex - 1].value = ""
                                        setState(prev => ({ ...prev, pinIndex: prev.pinIndex - 1 }))
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <g clip-path="url(#clip0_2032_263)">
                                        <path fillRule="evenodd" clip-rule="evenodd" d="M11.9044 7.65625H27.3437C28.214 7.65625 29.0486 8.00195 29.6639 8.61731C30.2793 9.23266 30.625 10.0673 30.625 10.9375V24.0625C30.625 24.9327 30.2793 25.7673 29.6639 26.3827C29.0486 26.998 28.214 27.3438 27.3437 27.3438H11.9044C11.4124 27.3436 10.9267 27.2329 10.4833 27.0197C10.0399 26.8065 9.65012 26.4964 9.34279 26.1122L3.92873 19.3462C3.5091 18.8224 3.28045 18.1712 3.28045 17.5C3.28045 16.8288 3.5091 16.1776 3.92873 15.6538L9.34279 8.88781C9.64966 8.5042 10.0387 8.19439 10.4813 7.98123C10.9239 7.76807 11.4087 7.65702 11.9 7.65625H11.9044ZM6.77904 6.83812C7.39393 6.06946 8.17385 5.44897 9.06106 5.02259C9.94826 4.59622 10.92 4.37489 11.9044 4.375H27.3437C29.0842 4.375 30.7534 5.0664 31.9841 6.29711C33.2148 7.52782 33.9062 9.19702 33.9062 10.9375V24.0625C33.9062 25.803 33.2148 27.4722 31.9841 28.7029C30.7534 29.9336 29.0842 30.625 27.3437 30.625H11.9044C10.92 30.6251 9.94826 30.4038 9.06106 29.9774C8.17385 29.551 7.39393 28.9305 6.77904 28.1619L1.36717 21.3959C0.482141 20.2903 -6.10352e-05 18.9162 -6.10352e-05 17.5C-6.10352e-05 16.0838 0.482141 14.7097 1.36717 13.6041L6.77904 6.83812ZM15.925 11.9656C15.614 11.6758 15.2026 11.5181 14.7776 11.5256C14.3526 11.5331 13.947 11.7052 13.6464 12.0058C13.3458 12.3064 13.1737 12.7119 13.1662 13.137C13.1587 13.562 13.3164 13.9734 13.6062 14.2844L16.8219 17.5L13.6062 20.7156C13.445 20.8658 13.3158 21.0469 13.2261 21.2482C13.1364 21.4494 13.0882 21.6667 13.0843 21.887C13.0804 22.1073 13.1209 22.3261 13.2035 22.5304C13.286 22.7347 13.4088 22.9202 13.5646 23.076C13.7204 23.2318 13.906 23.3546 14.1102 23.4371C14.3145 23.5197 14.5333 23.5602 14.7536 23.5563C14.9739 23.5524 15.1912 23.5042 15.3924 23.4145C15.5937 23.3249 15.7748 23.1956 15.925 23.0344L19.1406 19.8188L22.3562 23.0344C22.5064 23.1956 22.6876 23.3249 22.8888 23.4145C23.0901 23.5042 23.3073 23.5524 23.5276 23.5563C23.7479 23.5602 23.9667 23.5197 24.171 23.4371C24.3753 23.3546 24.5608 23.2318 24.7166 23.076C24.8724 22.9202 24.9952 22.7347 25.0777 22.5304C25.1603 22.3261 25.2008 22.1073 25.1969 21.887C25.193 21.6667 25.1448 21.4494 25.0551 21.2482C24.9655 21.0469 24.8362 20.8658 24.675 20.7156L21.4594 17.5L24.675 14.2844C24.9648 13.9734 25.1226 13.562 25.1151 13.137C25.1076 12.7119 24.9354 12.3064 24.6348 12.0058C24.3342 11.7052 23.9287 11.5331 23.5036 11.5256C23.0786 11.5181 22.6672 11.6758 22.3562 11.9656L19.1406 15.1813L15.925 11.9656Z" fill="#CB6F6F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2032_263">
                                            <rect width="35" height="35" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            }

        {state.step === "success" &&  state.resLoan &&
                <div className="flex flex-col items-center gap-8 my-4 w-full min-w-[50vw] mx-auto px-2">
                    <h6 className='text-2xl font-medium'>Transfer Successful</h6>
                    <div className="flex flex-col gap-6 w-full bg-white rounded-lg py-6 px-4">
                        <div className="flex flex-col gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                                <circle cx="24.5" cy="24.5" r="24.5" fill="#372A54" />
                                <path d="M24.6181 4.32007C30.0016 4.32007 35.1645 6.45863 38.9712 10.2653C42.7779 14.072 44.9164 19.2349 44.9164 24.6184C44.9164 30.0018 42.7779 35.1648 38.9712 38.9715C35.1645 42.7781 30.0016 44.9167 24.6181 44.9167C19.2347 44.9167 14.0717 42.7781 10.2651 38.9715C6.45839 35.1648 4.31982 30.0018 4.31982 24.6184C4.31982 19.2349 6.45839 14.072 10.2651 10.2653C14.0717 6.45863 19.2347 4.32007 24.6181 4.32007ZM22.0895 28.6229L17.5804 24.1109C17.4188 23.9493 17.2269 23.821 17.0157 23.7336C16.8045 23.6461 16.5781 23.601 16.3495 23.601C16.1209 23.601 15.8945 23.6461 15.6833 23.7336C15.4721 23.821 15.2802 23.9493 15.1185 24.1109C14.7921 24.4374 14.6087 24.8802 14.6087 25.3419C14.6087 25.8036 14.7921 26.2463 15.1185 26.5728L20.86 32.3143C21.0212 32.4768 21.213 32.6058 21.4243 32.6938C21.6355 32.7818 21.8621 32.8271 22.091 32.8271C22.3199 32.8271 22.5465 32.7818 22.7577 32.6938C22.969 32.6058 23.1608 32.4768 23.3219 32.3143L35.211 20.4224C35.3748 20.2614 35.5051 20.0696 35.5944 19.858C35.6837 19.6464 35.7302 19.4193 35.7313 19.1896C35.7324 18.9599 35.6879 18.7323 35.6006 18.5199C35.5133 18.3075 35.3847 18.1145 35.2224 17.952C35.0601 17.7895 34.8673 17.6607 34.6549 17.5731C34.4426 17.4855 34.2151 17.4409 33.9854 17.4416C33.7557 17.4424 33.5285 17.4887 33.3168 17.5778C33.1051 17.6668 32.9131 17.7969 32.752 17.9605L22.0895 28.6229Z" fill="#A694CF" />
                            </svg>

                            <h6 className="w-full  text-center border-b-2 border-gray-200 pb-4 text-lg font-normal text-gray-800">{formatTime(state.resLoan.transaction.transactionDate)}</h6>

                        </div>

                        <div className="flex flex-col gap-2">
                            <h6 className="text-lg font-normal text-gray-800">Loan ID</h6>
                            <h6 className="text-lg font-normal text-gray-800">{state.resLoan.loanPayment.loanId}</h6>

                            <svg fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_24_" d="M216.358,271.76c-2.322-5.605-7.792-9.26-13.858-9.26H180V15c0-8.284-6.716-15-15-15 c-8.284,0-15,6.716-15,15v247.5h-22.5c-6.067,0-11.537,3.655-13.858,9.26c-2.321,5.605-1.038,12.057,3.252,16.347l37.5,37.5 C157.322,328.536,161.161,330,165,330s7.678-1.464,10.607-4.394l37.5-37.5C217.396,283.816,218.68,277.365,216.358,271.76z"></path> </g></svg>

                            <h6 className="text-lg font-normal text-gray-800">Loan Payment ID</h6>
                            <h6 className="text-lg font-normal text-gray-800">{state.resLoan.loanPayment.loanPaymentId}</h6>

                        </div>

                        <div className="flex flex-col items-center gap-4 border-b-2 border-gray-200 pb-4">
                            <h6 className="text-2xl font-semibold text-gray-800">Amount</h6>
                            <div className="flex gap-2 items-center">
                                <h6 className="text-2xl font-semibold text-gray-800">{state.resLoan.loanPayment.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h6>
                                <h6 className="text-lg font-normal text-gray-800">Baht</h6>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center flex-wrap gap-2">
                                <h6 className="text-lg font-normal text-gray-500">Fee: </h6>
                                <h6 className="text-lg font-normal text-gray-800">0.00 THB </h6>
                            </div>
                            <div className="flex items-center flex-wrap gap-2">
                                <h6 className="text-lg font-normal text-gray-500">Bill ID: </h6>
                                <h6 className="text-base font-light text-gray-800">{state.resLoan.transaction.transactionId}</h6>
                            </div>
                        </div>
                    </div>
                   <div className="flex flex-col gap-2 w-full">
                   <Link 
                   href={"/"} 
                   className="content-center relative w-full h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-rubik text-center inline-block">
                        Go to account
                    </Link>
                    <Link
                    href={"/show-loan"}
                    className="text-center"
                    >
                        Continue
                    </Link>
                   </div>

                </div>

            }

        </>

    )

}
