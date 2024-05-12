import React from 'react'

interface LoanProps {
  title: string;
  interestRate: number;
  maximumLoan: string;
  imageSrc: string;
}

const LoanComponent: React.FC<LoanProps> = ({ title, interestRate, maximumLoan, imageSrc }) => {
  return (
    <div className="flex border-2 rounded-3 bg-[rgba(122,138,237,0.15)] hover:border-[#9747ff] box-border items-center justify-center space-x-10 font-rubik w-full my-3">
      <div className="object-fill w-[144px]">
        <img
          src={imageSrc}
          alt={title + "IMG"}
        />
      </div>
      <div className="m-8 flex flex-col gap-2 items-center">
        <h2>{title}</h2>
        <div className="w-full relative bg-[#ded4f5] rounded-3 c p-2 inline-block text-sm">{maximumLoan} THB</div>
        <div className="w-full bg-[#ded4f5] rounded-3 text-center p-2 inline-block text-xs">Interest <span className="text-sm font-medium">{interestRate}%</span></div>
      </div>
    </div>
  )
}

export default LoanComponent