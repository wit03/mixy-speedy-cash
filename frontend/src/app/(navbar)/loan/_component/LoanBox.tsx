import React from 'react'

interface LoanProps {
  title: string
  interestRate: number
  maximumLoan: string
}

const LoanComponent: React.FC<LoanProps> = ({ title, interestRate, maximumLoan }) => {
  return (
    <div className="flex border-2 rounded-3 bg-[rgba(122,138,237,0.15)] hover:border-[#9747ff] box-border items-center justify-center space-x-10 font-rubik w-full my-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" className="w-24 h-24" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
      </svg>
      <div className="m-8 flex flex-col gap-2 items-center">
        <h2>{title}</h2>
        <div className = "w-full relative bg-[#ded4f5] rounded-3 c p-2 inline-block text-sm">{maximumLoan} THB</div>
        <div className = "w-full bg-[#ded4f5] rounded-3 text-center p-2 inline-block text-xs">Interest <span className="text-sm font-medium">{interestRate}%</span></div>
      </div>
    </div>
  )
}

export default LoanComponent