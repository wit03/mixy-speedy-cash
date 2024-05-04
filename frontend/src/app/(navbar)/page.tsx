import Image from "next/image";
import Profile from "../components/profile";
import Balance from "../components/balance";
import Transactions from "../components/transactions";

export default function Home() {
  return (
    <div className="flex flex-col items-start mx-6 mt-14 mb-6">
      <svg className="absolute top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="124" height="126" viewBox="0 0 124 126" fill="none">
        <circle cx="100" cy="26" r="100" fill="#F8E192" />
      </svg>
      <Profile />
      <div className="mt-6" />
      <Balance />
      <svg className="absolute bottom-80 left-0 z-0" xmlns="http://www.w3.org/2000/svg" width="128" height="200" viewBox="0 0 128 200" fill="none">
        <circle cx="28" cy="100" r="100" fill="#2FCBFC" fill-opacity="0.3" />
      </svg>
      <Transactions />

    </div>
  );
}
