//@ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";

const Register4 = ({
  pin,
  setPin,
  handleRegister,
}) => {
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [isPINSubmitted, setIsPINSubmitted] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newIdentity = [...pin];
    newIdentity[index] = value.substring(value.length - 1);

    if (!value) setActiveIdentityIndex(index - 1);
    else setActiveIdentityIndex(index + 1);

    setPin(newIdentity);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !pin[index]) {
      const previousIndex = index > 0 ? index - 1 : index;
      setActiveIdentityIndex(previousIndex);
      inputRefs.current[previousIndex]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[activeIdentityIndex]?.focus();
  }, [activeIdentityIndex]);

  useEffect(() => {
    if (pin.every((value) => value !== "")) {
      setIsPINSubmitted(true);
      handleRegister()
    } else {
      setIsPINSubmitted(false);
    }
  }, [pin]);

  function handlePressPinByMouse(item: number) {
    setPin(prev => (prev + item.toString()))
  }


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
              {pin.map((data, i) => (
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
           <div className="grid grid-cols-3 items-center gap-4 mt-12 place-items-center ">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => (
                        <button
                            onClick={() => handlePressPinByMouse(item)}
                            key={i}
                            className="hover:bg-gray-50/45 border-3 border-solid border-[#fbc2eb] bg-gray-50 rounded-full border w-16 h-16 text-center self-center">
                            <h6 className="text-xl font-medium text-gray-800">{item}</h6>
                        </button>
                    ))}
                    <button>
                    </button>

                    <button
                    className="
                    flex items-center content-center justify-center
                    hover:bg-gray-50/45 border-3 border-solid border-red-500 bg-gray-50 rounded-full border w-16 h-16 "
                    onClick={() => {
                        if(index >= 1 && index < 6){
                            //@ts-ignore
                            pinRef.current[index-1].value = ""
                            setIndex(prev => prev - 1)
                        }
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <g clip-path="url(#clip0_2032_263)">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M11.9044 7.65625H27.3437C28.214 7.65625 29.0486 8.00195 29.6639 8.61731C30.2793 9.23266 30.625 10.0673 30.625 10.9375V24.0625C30.625 24.9327 30.2793 25.7673 29.6639 26.3827C29.0486 26.998 28.214 27.3438 27.3437 27.3438H11.9044C11.4124 27.3436 10.9267 27.2329 10.4833 27.0197C10.0399 26.8065 9.65012 26.4964 9.34279 26.1122L3.92873 19.3462C3.5091 18.8224 3.28045 18.1712 3.28045 17.5C3.28045 16.8288 3.5091 16.1776 3.92873 15.6538L9.34279 8.88781C9.64966 8.5042 10.0387 8.19439 10.4813 7.98123C10.9239 7.76807 11.4087 7.65702 11.9 7.65625H11.9044ZM6.77904 6.83812C7.39393 6.06946 8.17385 5.44897 9.06106 5.02259C9.94826 4.59622 10.92 4.37489 11.9044 4.375H27.3437C29.0842 4.375 30.7534 5.0664 31.9841 6.29711C33.2148 7.52782 33.9062 9.19702 33.9062 10.9375V24.0625C33.9062 25.803 33.2148 27.4722 31.9841 28.7029C30.7534 29.9336 29.0842 30.625 27.3437 30.625H11.9044C10.92 30.6251 9.94826 30.4038 9.06106 29.9774C8.17385 29.551 7.39393 28.9305 6.77904 28.1619L1.36717 21.3959C0.482141 20.2903 -6.10352e-05 18.9162 -6.10352e-05 17.5C-6.10352e-05 16.0838 0.482141 14.7097 1.36717 13.6041L6.77904 6.83812ZM15.925 11.9656C15.614 11.6758 15.2026 11.5181 14.7776 11.5256C14.3526 11.5331 13.947 11.7052 13.6464 12.0058C13.3458 12.3064 13.1737 12.7119 13.1662 13.137C13.1587 13.562 13.3164 13.9734 13.6062 14.2844L16.8219 17.5L13.6062 20.7156C13.445 20.8658 13.3158 21.0469 13.2261 21.2482C13.1364 21.4494 13.0882 21.6667 13.0843 21.887C13.0804 22.1073 13.1209 22.3261 13.2035 22.5304C13.286 22.7347 13.4088 22.9202 13.5646 23.076C13.7204 23.2318 13.906 23.3546 14.1102 23.4371C14.3145 23.5197 14.5333 23.5602 14.7536 23.5563C14.9739 23.5524 15.1912 23.5042 15.3924 23.4145C15.5937 23.3249 15.7748 23.1956 15.925 23.0344L19.1406 19.8188L22.3562 23.0344C22.5064 23.1956 22.6876 23.3249 22.8888 23.4145C23.0901 23.5042 23.3073 23.5524 23.5276 23.5563C23.7479 23.5602 23.9667 23.5197 24.171 23.4371C24.3753 23.3546 24.5608 23.2318 24.7166 23.076C24.8724 22.9202 24.9952 22.7347 25.0777 22.5304C25.1603 22.3261 25.2008 22.1073 25.1969 21.887C25.193 21.6667 25.1448 21.4494 25.0551 21.2482C24.9655 21.0469 24.8362 20.8658 24.675 20.7156L21.4594 17.5L24.675 14.2844C24.9648 13.9734 25.1226 13.562 25.1151 13.137C25.1076 12.7119 24.9354 12.3064 24.6348 12.0058C24.3342 11.7052 23.9287 11.5331 23.5036 11.5256C23.0786 11.5181 22.6672 11.6758 22.3562 11.9656L19.1406 15.1813L15.925 11.9656Z" fill="#CB6F6F"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2032_263">
                                <rect width="35" height="35" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>

              </div>
        </div>
      </div>
    </>
  );
};

export default Register4;
