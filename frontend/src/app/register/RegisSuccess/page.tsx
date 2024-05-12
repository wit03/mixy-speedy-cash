"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-y-[1rem] pb-14">
      <svg
        id="bg"
        className="absolute top-0 right-0"
        xmlns="http://www.w3.org/2000/svg"
        width="124"
        height="126"
        viewBox="0 0 124 126"
        fill="none"
      >
        <circle cx="100" cy="26" r="100" fill="#F8E192" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="200"
        viewBox="0 0 128 200"
        fill="none"
      >
        <circle cx="28" cy="100" r="100" fill="#2FCBFC4D" />
      </svg>
      <div className="flex flex-col items-center gap-6 ">
        <div className="text-black font-rubik text-2xl font-semibold">
          Congratulation !
        </div>
        <div className="flex justify-center items-center h-56 w-56 stroke-2 stroke-[#7A5DBA] bg-[#A694CF] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-40 h-40 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <div className="text-black font-rubik text-xl font-bold">Success</div>
        <div className="text-black text-center font-rubik text-lg font-normal w-48">Your account has been created successfully</div>
        <Link href="/login">
        <button type="submit" className="relative w-48 h-[2.31rem] bg-gradient-to-r from-[#a6c1ee] to-[rgba(122,93,186,0.2)] border border-solid border-ded4f5 box-border rounded-md text-white text-14 tracking-0.02 font-rubik text-center inline-block">Continue</button>
        </Link>
      </div>
    </div>
  );
}
