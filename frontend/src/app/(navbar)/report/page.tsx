"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
    ssr: false,
});


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

const Loan = () => {
  return (
    <div className="flex flex-col mx-6 mt-8 mb-6 font-rubik min-h-[calc(100vh-32px-24px)] overflow-y-scroll gap-4">
      <h1 className="text-xl font-medium my-4 text-[#333333] mx-auto">
        Reports
      </h1>

      <div className="flex flex-row gap-4 mt-4">
        <div className="flex justify-between flex-col w-1/2 bg-[#F8E192] h-20 rounded-lg p-3 text-gray-700 font-rubik text-base font-normal drop-shadow-md">
          Money In
          <div className="font-rubik text-base font-medium">+ $3,456.98</div>
        </div>
        <div className="flex justify-between flex-col w-1/2 bg-[#B6E0F3] h-20 rounded-lg p-3 text-gray-700 font-rubik text-base font-normal drop-shadow-md">
          Money Out
          <div className="font-rubik text-base font-medium">- $567.25</div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col rounded-lg w-full border border-solid border-white border-opacity-60 bg-white bg-opacity-40 bg-gradient-to-r from-[#FFE6BF] via-white to-[#D6D0F1] drop-shadow-md">
        <div className="mt-4">Monthly Spending</div>
        <BarChart
          width={360}
          height={320}
          data={rangeData}
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
          data={rangeData}
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
