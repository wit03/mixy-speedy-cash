"use client"

import { NumericFormat } from 'react-number-format';

interface AddrFieldProps {
    setAmount: React.Dispatch<React.SetStateAction<string | undefined>>;
    Amount: string | undefined;
}

const AmountField = (props: AddrFieldProps) => {

    return (
        <div className="relative h-11 w-full min-w-[200px]">
            <NumericFormat displayType="input" placeholder="" thousandSeparator=","  value={props.Amount} onChange={(e) => props.setAmount(e.target.value)}
                className="peer h-full w-full border-b border-gray-400 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-blue-gray-900 outline outline-0 transition-all placeholder-shown:border-gray-800 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
        </div>
    )
}

export default AmountField;