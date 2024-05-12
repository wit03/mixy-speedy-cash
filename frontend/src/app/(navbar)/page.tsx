"use client"
import Profile from "../components/profile";
import Balance from "../components/balance";
import Transactions from "../components/transactions";
import { CustomerContextType, useCustomer } from "@/provider/CustomerContext";

export default function Home() {

  const {customerState}:CustomerContextType = useCustomer?.()!;
  return (
    <div className="flex flex-col items-start mx-6 mt-14 mb-6">
    {customerState.customer && customerState.account ? 
    <>
      <svg className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
        <circle cx="100" cy="26" r="100" fill="#F8E192" />
      </svg>
      <Profile
      customer={customerState.customer}
      />
      <div className="mt-6" />
      <Balance
      customer={customerState.customer}
      account={customerState.account}
      />
      <svg className="absolute bottom-80 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
        <circle cx="28" cy="100" r="100" fill="#2FCBFC" fillOpacity="0.3" />
      </svg>
      <Transactions />
    </>
    :
    <div>
      <h6 className="text-xl font-normal text-gray-600">No customer data found</h6>
    </div>
    }

    </div>
  );
}
