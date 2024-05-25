"use client";

import { makeRequest } from "@/hook/makeRequets";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
    ssr: false,
});

export interface Untitled1 {
  msg:                  string;
  moneyIn:              Money;
  moneyOut:             Money;
  moneyInLastSixMonth:  { [key: string]: number };
  moneyOutLastSixMonth: { [key: string]: number };
}

export interface Money {
  _sum: Sum;
}

export interface Sum {
  amount: number;
}

const rangeData = [
  {
    month: "JAN",
    money: 350,
  },
  {
    month: "FEB",
    money: 480,
  },
  {
    month: "MAR",
    money: 275,
  },
  {
    month: "APR",
    money: 300,
  },
  {
    month: "MAY",
    money: 550,
  },
  {
    month: "JUN",
    money: 300,
  },
];
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];



const Loan = () => {




  const [state, setState] = useState<{
    moneyIn:              Money | null
    moneyOut:             Money | null
    moneyInLastSixMonth: {
      month: string;
      money: number;
  }[];
    moneyOutLastSixMonth: {
      month: string;
      money: number;
  }[];
  }>({
    moneyIn: null,
    moneyOut: null,
    moneyInLastSixMonth: [],
    moneyOutLastSixMonth: [],
  })

  async function GetReport() {
    const { data, error, status } = await makeRequest<{
      msg:                  string;
      moneyIn:              Money;
      moneyOut:             Money;
      moneyInLastSixMonth:  { [key: string]: number };
      moneyOutLastSixMonth: { [key: string]: number };
  }>("http://localhost:3000/customer/get-report", {
      method: "GET",
  })

  if(error || !data){
    toast.error(error?.data.msg || "Failed to get report")
    return
  }
  else {
    const {moneyIn, moneyInLastSixMonth,moneyOut,moneyOutLastSixMonth} = data
    const rangeDataMoneyIn = Object.entries(moneyInLastSixMonth).map(([key, value]) => {
      const [year, month] = key.split("-");
      return {
          month: monthNames[parseInt(month, 10) - 1],
          money: value,
      };
    });
    const rangeDataMoneyOut = Object.entries(moneyOutLastSixMonth).map(([key, value]) => {
      const [year, month] = key.split("-");
      return {
          month: monthNames[parseInt(month, 10) - 1],
          money: value,
      };
    });

    setState(prev => ({...prev,
      moneyIn: moneyIn,
      moneyOut: moneyOut,
      moneyInLastSixMonth: rangeDataMoneyIn,
      moneyOutLastSixMonth: rangeDataMoneyOut,
    }))

  }
  }


  useEffect(() => {
    GetReport()
  }, [])
  

  return (
    <div className="flex flex-col mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)] overflow-y-scroll gap-4">
      <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">
        Reports
      </h1>

      <div className="flex flex-row gap-4 mt-4">
        <div className="flex justify-between flex-col w-1/2 bg-[#F8E192] h-20 rounded-lg p-3 text-gray-700 font-rubik text-base font-normal drop-shadow-md">
          Money In
          <div className="font-rubik text-base font-medium">+ ${state.moneyIn?._sum.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
        <div className="flex justify-between flex-col w-1/2 bg-[#B6E0F3] h-20 rounded-lg p-3 text-gray-700 font-rubik text-base font-normal drop-shadow-md">
          Money Out
          <div className="font-rubik text-base font-medium">- ${state.moneyOut?._sum.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col rounded-lg w-full border border-solid border-white border-opacity-60 bg-white bg-opacity-40 bg-gradient-to-r from-[#FFE6BF] via-white to-[#D6D0F1] drop-shadow-md">
        <div className="mt-4">Monthly Spending</div>
        <BarChart
          width={360}
          height={320}
          data={state.moneyOutLastSixMonth}
          margin={{ top: 30, right: 40, bottom: 20, left: 10 }}
        >
          <defs>
            <filter id="dropShadow">
              <feDropShadow
                dx="5"
                stdDeviation="2"
                floodColor="rgba(72, 69, 229, 0.5)"
              />
            </filter>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="money"
            style={{ fill: "url(#colorGradient)", filter: "url(#dropShadow)" }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBC2EB" />
              <stop offset="100%" stopColor="#A6C1EE" />
            </linearGradient>
          </defs>
        </BarChart>
      </div>

      <div className="flex justify-center items-center flex-col rounded-lg w-full border border-solid border-white border-opacity-60 bg-white bg-opacity-40 bg-gradient-to-r from-[#FFE6BF] via-white to-[#D6D0F1] drop-shadow-md">
        <div className="mt-4">Monthly Recieving</div>
        <BarChart
          width={360}
          height={320}
          data={state.moneyInLastSixMonth}
          margin={{ top: 30, right: 40, bottom: 20, left: 10 }}
        >
          <defs>
            <filter id="dropShadow">
              <feDropShadow
                dx="5"
                stdDeviation="2"
                floodColor="rgba(72, 69, 229, 0.5)"
              />
            </filter>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="money"
            style={{ fill: "url(#colorGradient)", filter: "url(#dropShadow)" }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBC2EB" />
              <stop offset="100%" stopColor="#A6C1EE" />
            </linearGradient>
          </defs>
        </BarChart>
      </div>
    </div>
  );
};

export default Loan;
