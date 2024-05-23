"use client"
import { Circular } from "@/app/components/Loading/Circular";
import { makeRequest } from "@/hook/makeRequets";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat, PatternFormat } from "react-number-format";

interface Deposit {
    customerId: string;
    accountId: string;
    balance: number;
    customer: Customer;
}

interface Customer {
    firstName: string;
    lastName: string;
}

interface Loan {
    loanId: string;
    startDate: null;
    endDate: null;
    interestRate: number;
    loanAmount: number;
    loanStatus: string;
    loanType: string;
    accountId: string;
}


export default function page({

}: {

    }) {
    const { customerState }: CustomerContextType = useCustomer?.()!;

    const [loading, setLoading] = useState<boolean>(false)
    const [state, setState] = useState({
        loanAmount: 0,
        step: 1
    })


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (state.loanAmount <= 100) {
            toast.error("Loan amount should not be less than 100")
            return
        }
        setLoading(true)
        const { data, error, status } = await makeRequest<{
            msg: string;
            loan: Loan;
            deposit: Deposit;
        }>("http://localhost:3000/loan/create-loan", {
            method: "POST",
            data: {
                loanType: "normal",
                loanAmount: state.loanAmount,
                interestRate: 3,
                installmentLength: 6,
            }
        })
        if (!data?.loan || error || status !== 200) {
            setLoading(false)
            toast.error(data?.msg || "Failed to put your loan to consider state")
            return
        }
        else {
            toast.success("Success to create loan, please wait for employee to consider your loan")
            setLoading(false)
            return
        }

    }


    return (
        <>

            <Circular
                loading={loading}
            />
            {state.step === 0 &&
                <div className="flex flex-col gap-12">
                    <div className="w-full bg-sky-200 rounded-b-3xl p-8 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <Link href="/loan" aria-label="Back to Home Page">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                                </svg>
                            </Link>
                            <h6 className="text-2xl font-medium text-gray-800">Loan Application</h6>
                            <p></p>
                        </div>
                        <div className="grid gap-2 bg-white mx-auto w-full lg:w-2/3 p-4 rounded-lg mt-4 text-center">
                            <h6 className="text-lg font-normal text-gray-600">{customerState.customer?.firstName + " " + customerState.customer?.lastName}</h6>
                            <h6 className="text-xl font-medium text-gray-800">{customerState.account?.accountId.slice(0, 3)}-{customerState.account?.accountId.slice(3, 6)}-{customerState.account?.accountId.slice(6)}</h6>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex flex-col gap-2">
                            <h6 className="text-xl font-medium text-gray-600">Total Amount</h6>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <NumericFormat
                                    displayType="input"
                                    placeholder="" thousandSeparator=","
                                    suffix=" THB"
                                    value={state.loanAmount}
                                    onChange={(e) => setState(prev => ({ ...prev, loanAmount: Number(e.target.value.replace(" THB", "").replace(",", "")) }))}
                                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h6 className="text-xl font-medium text-gray-600">Interest</h6>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <NumericFormat
                                    displayType="input"
                                    placeholder="" thousandSeparator=","
                                    readOnly
                                    value={"3"}
                                    suffix=" %"
                                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h6 className="text-xl font-medium text-gray-600">Tenure</h6>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <NumericFormat
                                    displayType="input"
                                    placeholder="" thousandSeparator=","
                                    readOnly
                                    value={"6"}
                                    suffix=" months"
                                    className="peer text-right h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                            </div>
                        </div>

                        <div className="mx-auto w-full p-4  bg-indigo-400/20 rounded-[3px] border border-black" >
                            <h6 className="text-xl font-medium text-gray-600">Monthly Installment</h6>

                            <div className="flex justify-end items-center gap-2">
                                <h6 className="text-3xl font-medium text-gray-600">{state.loanAmount * 0.03}</h6>
                                <h6 className="text-base font-medium text-gray-600">THB</h6>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="hover:opacity-95 mx-auto w-2/3 relative h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block">
                            Confirm
                        </button>
                    </div>

                </div>
            }

            {state.step === 1 &&
                <div className="flex flex-col min-h-[calc(100vh-32px-24px)] items-center justify-center overflow-hidden">
                    <svg id="bg" className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
                        <circle cx="100" cy="26" r="100" fill="#F8E192" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
                        <circle cx="28" cy="100" r="100" fill="#2FCBFC4D" />
                    </svg>

                   <div className="flex flex-col gap-4 items-center justify-center">
                    <h6 className="text-3xl font-bold  text-gray-800">Congratulation !</h6>
                    <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194" viewBox="0 0 194 194" fill="none">
                        <g filter="url(#filter0_d_2365_201)">
                            <path d="M97 0C121.665 0 145.32 9.79819 162.761 27.2391C180.202 44.68 190 68.3349 190 93C190 117.665 180.202 141.32 162.761 158.761C145.32 176.202 121.665 186 97 186C72.3349 186 48.68 176.202 31.2391 158.761C13.7982 141.32 4 117.665 4 93C4 68.3349 13.7982 44.68 31.2391 27.2391C48.68 9.79819 72.3349 0 97 0ZM85.4149 111.348L64.7556 90.675C64.0149 89.9344 63.1357 89.3469 62.168 88.946C61.2003 88.5452 60.1632 88.3389 59.1158 88.3389C58.0684 88.3389 57.0312 88.5452 56.0636 88.946C55.0959 89.3469 54.2166 89.9344 53.476 90.675C51.9802 92.1708 51.1399 94.1995 51.1399 96.3148C51.1399 98.4301 51.9802 100.459 53.476 101.955L79.7817 128.26C80.5202 129.005 81.3988 129.595 82.3668 129.999C83.3347 130.402 84.3729 130.609 85.4215 130.609C86.4701 130.609 87.5083 130.402 88.4762 129.999C89.4442 129.595 90.3228 129.005 91.0613 128.26L145.533 73.7756C146.283 73.038 146.88 72.1592 147.289 71.1897C147.699 70.2202 147.912 69.1794 147.917 68.1271C147.922 67.0748 147.718 66.032 147.318 65.0588C146.918 64.0856 146.329 63.2012 145.585 62.4567C144.842 61.7122 143.958 61.1223 142.985 60.721C142.013 60.3197 140.97 60.115 139.918 60.1186C138.865 60.1223 137.824 60.3343 136.854 60.7423C135.884 61.1503 135.005 61.7463 134.266 62.496L85.4149 111.348Z" fill="#A694CF" />
                            <path d="M85.4152 109.226L65.8166 89.6147L65.8162 89.6143C64.9363 88.7344 63.8917 88.0364 62.742 87.5602C61.5924 87.084 60.3602 86.8389 59.1158 86.8389C57.8714 86.8389 56.6392 87.084 55.4895 87.5602C54.3399 88.0364 53.2953 88.7344 52.4153 89.6143C50.6383 91.3914 49.6399 93.8016 49.6399 96.3148C49.6399 98.8279 50.6383 101.238 52.4153 103.015L78.7169 129.317C79.5948 130.202 80.6393 130.904 81.79 131.383L82.3668 129.999L81.79 131.383C82.9407 131.863 84.1749 132.109 85.4215 132.109C86.6681 132.109 87.9023 131.863 89.053 131.383L88.4762 129.999L89.053 131.383C90.2029 130.904 91.2467 130.203 92.1242 129.319C92.1249 129.318 92.1255 129.317 92.1261 129.317L146.584 74.8454C146.586 74.8439 146.587 74.8424 146.589 74.8408C147.478 73.9654 148.186 72.9228 148.671 71.773C149.158 70.6211 149.411 69.3843 149.417 68.1341C149.423 66.8838 149.181 65.6448 148.705 64.4884L147.318 65.0588L148.705 64.4884C148.23 63.3321 147.53 62.2813 146.647 61.3967L145.585 62.4567L146.647 61.3967C145.763 60.5121 144.713 59.8111 143.557 59.3344C142.402 58.8576 141.163 58.6143 139.913 58.6187C138.662 58.623 137.425 58.8748 136.273 59.3596C135.122 59.8437 134.079 60.5504 133.202 61.4391C133.201 61.4405 133.199 61.4419 133.198 61.4434L85.4152 109.226ZM97 1.5C121.267 1.5 144.541 11.1402 161.7 28.2997C178.86 45.4593 188.5 68.7327 188.5 93C188.5 117.267 178.86 140.541 161.7 157.7C144.541 174.86 121.267 184.5 97 184.5C72.7327 184.5 49.4593 174.86 32.2997 157.7C15.1402 140.541 5.5 117.267 5.5 93C5.5 68.7327 15.1402 45.4593 32.2997 28.2997C49.4593 11.1402 72.7327 1.5 97 1.5Z" stroke="#7A5DBA" strokeWidth="3" />
                        </g>
                        <defs>
                            <filter id="filter0_d_2365_201" x="0" y="0" width="194" height="194" filterUnits="userSpaceOnUse">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2365_201" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2365_201" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <h6 className="text-gray-800 font-normal text-md px-8 sm:px-16 lg:px-32">You loan has been applied successfully Please wait for the result</h6>
                    <Link
                    href={"/show-loan"}
                        className="content-center hover:opacity-95 mx-auto w-2/3 relative h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block">
                        Continue
                    </Link>
                   </div>

                </div>
            }

        </>

    )

}
