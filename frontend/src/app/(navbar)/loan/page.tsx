"use client"

import LoanBox from "./_component/LoanBox"
import Link from "next/link";

const HomePage = () => {
    return (
        <div className="flex flex-col m-4 font-rubik items-start mx-6 mt-14 mb-6">
            <svg className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none"><circle cx="100" cy="26" r="100" fill="#F8E192"></circle></svg>
            <svg className="absolute bottom-20 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none"><circle cx="28" cy="100" r="100" fill="#2FCBFC4D" /></svg>
            <Link href="/" aria-label="Back to Home Page">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                </svg>
            </Link>
            <div className="relative text-[20px] tracking-0.02 font-semibold inline-block py-2 mt-2">Personal Loan</div>
            <div className="relative text-[15px] tracking-0.02 font-light">Select the loan that suit with you</div>
            <Link href="/loan/normal" className="w-full">
                <LoanBox
                    title="Normal Loan"
                    interestRate={3}
                    maximumLoan="<= 50000"
                    imageSrc="./loan/normalLoan.png"
                />
            </Link>
            <LoanBox
                title="Special Loan"
                interestRate={15}
                maximumLoan='Unlimited'
                imageSrc="./loan/specialLoan.jpg"
            />
        </div>
    )
}

export default HomePage