"use client"

import Link from "next/link";

const LoanInformation = () => {
    return (
        <div className="flex flex-col m-4 font-rubik items-start mx-6 mt-14 mb-6">
            <svg className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none"><circle cx="100" cy="26" r="100" fill="#F8E192"></circle></svg>
            <svg className="absolute bottom-20 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none"><circle cx="28" cy="100" r="100" fill="#2FCBFC4D" /></svg>
            <Link href="/loan" aria-label="Back to Home Page">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-current text-[#858585CC]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                </svg>
            </Link>
            <div className="relative text-[20px] tracking-0.02 font-semibold inline-block py-2 mt-2">Normal Loan</div>
            <img
                src="/loan/normalLoan.png"
                alt="AJARN DANG"
                className="relative w-full rounded-sm overflow-hidden mt-[20px]"
            />
            <div className="relative w-full rounded-sm bg-[rgba(122,138,237,0.15)] pt-[13px] px-[18px] mt-[21px]">
                <div className="font-bold">Information</div>
                <div className="w-282 px-4 py-2 font-rubik text-sm font-light text-left text-black">
                    <p className="mb-4">Objective: The purpose of this policy is to outline the terms and conditions for borrowing a loan with a fixed interest rate of 3%, to be repaid within six months.</p>
                    <p className="mb-2">Eligibility Criteria:</p>
                    <ol className="list-decimal ml-4">
                        <li className="mb-2">Age: The borrower must be of legal age as per the jurisdiction's laws.</li>
                        <li className="mb-2">Creditworthiness: Borrowers must meet the credit requirements set by the lending institution.</li>
                        <li className="mb-2">Income Stability: Borrowers must demonstrate a stable source of income to ensure repayment capability.</li>
                        <li>Documentation: Borrowers are required to provide necessary documentation as per the lending institution's requirements.</li>
                    </ol>
                </div>
            </div>
            <button type="button" className="mt-[21px] relative w-full h-[37px] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-bold text-center inline-block">Applying Loan</button>
        </div >
    )
}

export default LoanInformation