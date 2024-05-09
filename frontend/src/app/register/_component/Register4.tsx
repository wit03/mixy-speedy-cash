"use client";

import { useState, useRef, useEffect } from "react";

const Register4 = () => {
  const [identity, setIdentity] = useState(new Array(6).fill(""));
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [isPINSubmitted, setIsPINSubmitted] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newIdentity = [...identity];
    newIdentity[index] = value.substring(value.length - 1);

    if (!value) setActiveIdentityIndex(index - 1);
    else setActiveIdentityIndex(index + 1);

    setIdentity(newIdentity);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !identity[index]) {
      const previousIndex = index > 0 ? index - 1 : index;
      setActiveIdentityIndex(previousIndex);
      inputRefs.current[previousIndex]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[activeIdentityIndex]?.focus();
  }, [activeIdentityIndex]);

  useEffect(() => {
    if (identity.every((value) => value !== "")) {
      setIsPINSubmitted(true);
    } else {
      setIsPINSubmitted(false);
    }
  }, [identity]);


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
            <div className="z-10 h-11 w-11 bg-[#A694CF] rounded-full flex justify-center items-center text-white">
              4
            </div>
          </div>
          <div className="flex flex-col items-center font-rubik text-2xl font-bold gap-8">
            Setup PIN
            <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#7A5DBA]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-[#AE73FB]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div className="flex gap-2">
              {identity.map((data, i) => (
                <input
                  key={i}
                  className="w-[calc(100%/6)] h-12 rounded-lg border-4 border-[rgba(24,43,166,0.15)] text-center"
                  type="password"
                  inputMode="numeric"
                  value={data}
                  maxLength={1}
                  onChange={(e) => handleOnChange(e, i)}
                  onKeyDown={(e) => handleOnKeyDown(e, i)}
                  ref={(ref) => (inputRefs.current[i] = ref)}
                  disabled={isPINSubmitted} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register4;
