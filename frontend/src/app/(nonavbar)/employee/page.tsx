"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import React, { PureComponent, useEffect, useState } from 'react';
import { makeRequest } from '@/hook/makeRequets';
import toast from 'react-hot-toast';
import { formatTime } from '@/utils/convertTime';
import { useRouter } from 'next/navigation';
import { EmployeeContextType, useEmployee } from '@/provider/EmployeeContext';

interface Temp {
  loanPaymentId: string;
  paidAmount:    number;
  createdAt:     string;
  Loan:          Loan;
}

interface Loan {
  loanPaymentId: string;
  paidAmount:number;
  accountId: string;
  Employee:  null | {
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate:   string;
  loanType:  string;
  account:   Account;
}

interface Account {
  customer: Customer;
}

interface Customer {
  firstName: string;
  lastName:  string;
}

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const renderCustomizedLabel = ({
  //@ts-ignore
  x, y, name
}) => {
  return (
    <text x={x} y={y} fill="black" textAnchor="end" dominantBaseline="central">
      {name}
    </text>
  );
};
export default function page({

}: {

}) {
  const router = useRouter()
  const { globalState }:EmployeeContextType  = useEmployee?.()!;

  // useEffect(() => {
  //   if(globalState.employee?.position !== "owner"){
  //     router.push("/employee/responsible")
  //   }
  // }, [globalState])
  const [state, setState] = useState<{
    loanProfit  : {
      month: string;
      money: number;
    }[];
    latestLoanPaid  : Temp[];
    totalAccounts: number;
    totalCustomers: number;
    totalEmployees: number;
    totalLoans: number;
    totalLoansIndebt: number;
    totalLoansProces: number;
  }>({
    loanProfit: [
      {
          "month": "JUN",
          "money": 50000
      },
      {
          "month": "JUL",
          "money": 28000
      },
      {
          "month": "AUG",
          "money": 43000
      },
      {
          "month": "SEP",
          "money": 32000
      },
      {
          "month": "OCT",
          "money": 60000
      },
      {
          "month": "NOV",
          "money": 30000
      },
      {
          "month": "DEC",
          "money": 10000
      },
      {
          "month": "JAN",
          "money": 20000
      },
      {
          "month": "FEB",
          "money": 35000
      },
      {
          "month": "MAR",
          "money": 127000
      },
      {
          "month": "APR",
          "money": 85666
      },
      {
          "month": "MAY",
          "money": 63623
      }
  ],
    totalAccounts: 120,
    totalCustomers: 200,
    totalEmployees: 4,
    totalLoans: 14,
    totalLoansIndebt: 0,
    totalLoansProces: 7,
    latestLoanPaid: [],
  })


  async function GetReport() {
    const { data, error, status } = await makeRequest<{
      msg:               string;
      loanPaymentProfit: { [key: string]: number };
      totalAccounts:     number;
      totalCustomers:    number;
      totalEmployees:    number;
      totalLoans:        number;
      totalLoansIndebt:  number;
      totalLoansProcess: number;
      latestLoanPaid: Temp[];
  }>("http://localhost:3000/employee/manager-report", {
      method: "GET",
  })

  if(error || !data){
    toast.error(error?.data.msg || "Failed to get report")
    return
  }
  else {
    const {msg, 
      loanPaymentProfit, 
      totalAccounts, 
      totalCustomers, 
      totalEmployees, 
      totalLoans, 
      totalLoansIndebt, 
      totalLoansProcess,
      latestLoanPaid
    } = data
    const loanProfit = Object.entries(loanPaymentProfit).map(([key, value]) => {
      const [year, month] = key.split("-");
      return {
        month: monthNames[parseInt(month, 10) - 1],
        money: value,
      };
    });
    
    
    setState(prev => ({...prev,
      // loanProfit: loanProfit,
      // totalAccounts:totalAccounts, 
      // totalCustomers:totalCustomers, 
      // totalEmployees:totalEmployees, 
      // totalLoans:totalLoans, 
      // totalLoansIndebt:totalLoansIndebt, 
      // totalLoansProces:totalLoansProcess,
      latestLoanPaid: latestLoanPaid 
    }))
  }
  }


  useEffect(() => {
    GetReport()
  }, [])
  
  // console.log(state)

  return (

    <div className='mx-10'>
      <h1 className=' font-rubik text-4xl my-8'>Dashboard</h1>
      <div className="grid w-full grid-cols-5 gap-6">
        <div className="items-center min-h-80 bg-white rounded-xl col-span-2 w-full grid grid-cols-2">

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </div>

            <div className='flex flex-col justify-center'>
              <div>Total Bank Account</div>
              <div> {state.totalAccounts} People</div>
            </div>
          </div>

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>

            </div>
            <div className='flex flex-col justify-center'>
              <div>Total Customer</div>
              <div> {state.totalCustomers} People</div>
            </div>
          </div>

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div className='flex flex-col justify-center'>
              <div>Total Employee</div>
              <div> {state.totalEmployees} People</div>
            </div>
          </div>

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
            <div className='flex flex-col justify-center'>
              <div>Total Loan Request</div>
              <div> {state.totalLoans} Request</div>
            </div>
          </div>

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>

            </div>
            <div className='flex flex-col justify-center'>
              <div>Total Loan In Process</div>
              <div> {state.totalLoansProces} Pending</div>
            </div>
          </div>

          <div className='flex justify-start items-center'>
            <div className='bg-[#D9D9D9] size-10 flex justify-center items-center mx-2 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9747FF" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>

            </div>
            <div className='flex flex-col justify-center'>
              <div>Total Loan InDept</div>
              <div> {state.totalLoansIndebt} InDept</div>
            </div>
          </div>

        </div>


        <div className="bg-white rounded-2xl p-6 col-span-3 w-full min-h-60">
          <div className="w-full h-full flex flex-col">
            <h6 className=" text-sm">Loan Profit</h6>
            <div className="w-full h-full">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={state.loanProfit}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
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
          </ResponsiveContainer>
            </div>
          </div>
        </div>

              
          
        <div className="bg-white rounded-2xl p-6 col-span-2 w-full min-h-60">
          <div className="w-full h-full flex flex-col">
            <h6 className=" text-sm">Amount Loan Apply</h6>
            <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart width={730} height={350}>
                <Pie data={[
                  {
                    "name": "Normal",
                    "value": 5000,
                    fill: '#A6C1EE',
                  },
                  {
                    "name": "Special",
                    "value": 2000,
                    fill: '#FBC2EB',
                  },
                ]} 
                label={renderCustomizedLabel}
                dataKey="value" 
                nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#FBC2EB" />
                  <Tooltip />

              </PieChart>
            </ResponsiveContainer>
              </div>
              </div>

        </div>
            

        <div className="bg-white rounded-2xl p-6 col-span-3 w-full min-h-60">
          <div className="w-full h-full flex flex-col">
            <h6 className=" text-sm">Total In flow-Out flow</h6>
            <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={[
                {
                  "name": "NOV",
                  "uv": 4000,
                  "pv": 2400
                },
                {
                  "name": "DEC",
                  "uv": 3000,
                  "pv": 1398
                },
                {
                  "name": "JAN",
                  "uv": 2000,
                  "pv": 9800
                },
                {
                  "name": "FEB",
                  "uv": 2780,
                  "pv": 3908
                },
                {
                  "name": "MAR",
                  "uv": 1890,
                  "pv": 4800
                },
                {
                  "name": "APR",
                  "uv": 2390,
                  "pv": 3800
                },
                {
                  "name": "MAY",
                  "uv": 3490,
                  "pv": 4300
                }
              ]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="pv"
              style={{ fill: "url(#colorGradient)", filter: "url(#dropShadow)" }}
            />
            <Bar
              dataKey="uv"
              style={{ fill: "url(#colorGradient)", filter: "url(#dropShadow)" }}
            />

            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBC2EB" />
                <stop offset="100%" stopColor="#A6C1EE" />
              </linearGradient>
            </defs>
            </BarChart>
          </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      <div className="relative overflow-x-auto mt-6 scrollbar-medium scrollbar-thumb">
  <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-2 py-3 w-20 overflow-hidden text-ellipsis whitespace-nowrap">
          Loan ID
        </th>
        <th scope="col" className="px-6 py-3 w-1/12">
          Account No.
        </th>
        <th scope="col" className="px-6 py-3 w-2/12">
          Account Name
        </th>
        <th scope="col" className="px-6 py-3 w-1/12">
          Amount
        </th>
        <th scope="col" className="px-6 py-3 w-1/12">
          Type
        </th>
        <th scope="col" className="px-6 py-3 w-2/12">
          StartDate
        </th>
        <th scope="col" className="px-6 py-3 w-2/12">
          EndDate
        </th>
        <th scope="col" className="px-6 py-3 w-2/12">
          Approve By
        </th>
      </tr>
    </thead>
    <tbody>
      {state.latestLoanPaid.length !== 0 && state.latestLoanPaid.map((item, i) => (
        <tr className="bg-white border-b overflow-hidden" key={i}>
          <th scope="row" className="px-2 py-3 max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">
            {item.loanPaymentId}
          </th>
          <td className="px-6 py-4">
            {item.Loan.accountId}
          </td>
          <td className="px-6 py-4">
            {item.Loan.account.customer.firstName + " " + item.Loan.account.customer.lastName}
          </td>
          <td className="px-6 py-4">
            {item.paidAmount}
          </td>
          <td className="px-6 py-4">
            {item.Loan.loanType}
          </td>
          <td className="px-6 py-4">
            {formatTime(item.Loan.startDate)}
          </td>
          <td className="px-6 py-4">
            {formatTime(item.Loan.endDate)}
          </td>
          <td className="px-6 py-4">
            {item.Loan.Employee?.firstName ? item.Loan.Employee?.firstName + " " + item.Loan.Employee?.lastName : "unknown"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>

  )

}
