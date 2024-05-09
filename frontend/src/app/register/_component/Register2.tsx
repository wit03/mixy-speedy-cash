"use client";

import React from "react";

const Register2 = ({ onPreviousButtonClick, onNextButtonClick }) => {
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
            <div className="z-10 h-11 w-11 bg-white rounded-full flex justify-center items-center border-4 border-[#A694CF]">
              3
            </div>
            <div className="z-10 h-11 w-11 bg-white rounded-full flex justify-center items-center border-4 border-[#A694CF]">
              4
            </div>
          </div>
          <div className="flex flex-col font-rubik text-base gap-3">
            Salary
            <input
              type="text"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
            />
            Career
            <input
              type="text"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
            />
            Company
            <input
              type="text"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
            />
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
            <div className="mr-2 text-lg">Next</div>
            <button
              className="bg-[#B2B2B2] text-white text-lg font-medium p-2 rounded-full"
              onClick={onNextButtonClick}
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register2;
