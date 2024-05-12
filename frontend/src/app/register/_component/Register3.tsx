"use client";

import { Checkbox } from "@headlessui/react";
import { useState } from "react";

const Register3 = ({ onPreviousButtonClick, onNextButtonClick }) => {
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 hidden size-4 text-white group-data-[checked]:block"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const allInputsFilled = email && password && confirmPassword && enabled1 && enabled2 && enabled3;

  return (
    <>
      <div className="flex flex-col h-full w-full justify-between">
        <div>
          <div className="flex py-6 gap-11 justify-center text-[#A694CF] font-rubik text-base relative">
            <div className="absolute border border-[#A694CF] w-[16rem] my-6 -z-1"></div>
            <div className="z-10 h-11 w-11 bg-[#A694CF] rounded-full flex justify-center items-center text-white">
              1
            </div>
            <div className="z-10 h-11 w-11 bg-[#A694CF] rounded-full flex justify-center items-center text-white">
              2
            </div>
            <div className="z-10 h-11 w-11 bg-[#A694CF] rounded-full flex justify-center items-center text-white">
              3
            </div>
            <div className="z-10 h-11 w-11 bg-white rounded-full flex justify-center items-center border-4 border-[#A694CF]">
              4
            </div>
          </div>
          <div className="flex flex-col font-rubik text-base gap-3">
            Email
            <input
              type="email"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            Password
            <input
              type="password"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            Confirm Password
            <input
              type="password"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-9 gap-4">
            <div className="flex items-center">
              <Checkbox
                checked={enabled1}
                onChange={setEnabled1}
                className="flex justify-center items-center group min-w-8 w-8 h-7 rounded-md bg-[#DED4F5] p-1"
              >
                <CheckIcon/>
              </Checkbox>
              <label className="text-black font-rubik text-base font-normal leading-4 mx-2">
                I have confirmed that all the information inputted is legitimate and true
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox
                checked={enabled2}
                onChange={setEnabled2}
                className="flex justify-center items-center group min-w-8 w-8 h-7 rounded-md bg-[#DED4F5] p-1"
              >
                <CheckIcon/>
              </Checkbox>
              <label className="text-black font-rubik text-base font-normal leading-4 mx-2">
                I agreed to the terms and conditions
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox
                checked={enabled3}
                onChange={setEnabled3}
                className="flex justify-center items-center group min-w-8 w-8 h-7 rounded-md bg-[#DED4F5] p-1"
              >
                <CheckIcon/>
              </Checkbox>
              <label className="text-black font-rubik text-base font-normal leading-4 mx-2">
                I am the one who got profitable from this account
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10 font-rubik">
          <div className="flex items-center">
            <button
              className="bg-[#B2B2B2] text-white text-lg font-medium p-2 rounded-full"
              onClick={onPreviousButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div className="ml-2 text-lg">Cancel</div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-lg">Register</div>
            <button
              className={`bg-[#AABAE8] text-white text-lg font-medium p-2 rounded-full ${allInputsFilled ? "" : "cursor-not-allowed opacity-50"}`}
              onClick={allInputsFilled ? onNextButtonClick : null}
              disabled={!allInputsFilled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register3;
