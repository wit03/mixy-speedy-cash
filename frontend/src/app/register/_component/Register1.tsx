"use client";

import React, { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";

const prefix = [
  { id: 1, prefix: "Mr.", unavailable: false },
  { id: 2, prefix: "Mrs.", unavailable: false },
  { id: 3, prefix: "Miss", unavailable: false },
  { id: 4, prefix: "Ms.", unavailable: false },
];
//@ts-ignore
const Register1 = ({ onNextButtonClick }) => {
  const [selectedPrefix, setSelectedPrefix] = useState(prefix[0]);
  const [identity, setIdentity] = useState(new Array(13).fill(""));
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [firstName, setFirstName] = useState("chitsanupong");
  const [lastName, setLastName] = useState("jateassavapirom");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0948652696");
  const [address, setAddress] = useState("Pathumthani lumkukka kuay");
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(13).fill(null));

  var today = new Date();
  var sixteenYearsAgo = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

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
    checkAllInputsFilled();
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
    if (activeIdentityIndex) inputRefs.current[activeIdentityIndex]?.focus();
  }, [activeIdentityIndex]);

  const checkAllInputsFilled = () => {
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      dob.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      address.trim() !== "" &&
      identity.every((val) => val.trim() !== "")
    ) {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  const handleNextButtonClick = () => {
    if (allInputsFilled) {
      onNextButtonClick();
    } else {
      alert("Please fill in all the inputs before proceeding.");
    }
  };

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex py-6 gap-11 justify-center text-[#A694CF] font-rubik text-base relative">
            <div className="absolute border border-[#A694CF] w-[16rem] my-6 -z-1"></div>
            <div className="z-10 h-11 w-11 bg-[#A694CF] rounded-full flex justify-center items-center text-white">
              1
            </div>
            <div className="z-10 h-11 w-11 bg-white rounded-full flex justify-center items-center border-4 border-[#A694CF]">
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
            Firstname
            <div className="flex items-center w-full">
              <div className="w-36 relative">
                <Listbox value={selectedPrefix} onChange={setSelectedPrefix}>
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-1 pl-3 pr-10 text-left border-4 border-[rgba(24,43,166,0.15)] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
                    <span className="block truncate">{selectedPrefix.prefix}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {selectedPrefix === prefix[0] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      )}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {prefix.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-4 ${
                              active
                                ? "bg-purple-100 text-purple-900"
                                : "text-gray-900"
                            }`
                          }
                          value={option}
                          disabled={option.unavailable}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {option.prefix}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
              <input
                type="text"
                className="self-center w-full h-10 ml-2 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  checkAllInputsFilled();
                }}
              />
            </div>
            Lastname
            <input
              type="text"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                checkAllInputsFilled();
              }}
            />
            Date of Birth
            <input
              type="date"
              max={sixteenYearsAgo.toISOString().split("T")[0]}
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                checkAllInputsFilled();
              }}
            />
            Identification Number
            <div className="identificationArea flex">
              {identity.map((data, i) => (
                <input
                  key={i}
                  className="w-[calc(100%/13)] h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)] text-center"
                  type="text"
                  inputMode="numeric"
                  value={data}
                  maxLength={2}
                  onChange={(e) => handleOnChange(e, i)}
                  onKeyDown={(e) => handleOnKeyDown(e, i)}
                  ref={(ref) => (inputRefs.current[i] = ref)}
                />
              ))}
            </div>
            Phonenumber
            <input
              type="tel"
              inputMode="numeric"
              className="self-center w-full h-10 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                checkAllInputsFilled();
              }}
            />
            Address
            <textarea
              className="text-start w-full h-20 rounded-md border-4 border-[rgba(24,43,166,0.15)]"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                checkAllInputsFilled();
              }}
            />
          </div>
        </div>

        <div>
          <span className={`flex justify-center ${allInputsFilled ? "hidden" : "text-red-500 mb-1"}`}>Please input all the required information.</span>
        <div className="flex justify-between items-center mb-10 font-rubik">
          <div className="flex items-center">
            <Link className="bg-[#CB6F6F] text-white text-lg font-medium p-2 rounded-full" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </Link>
            <div className="ml-2 text-lg">Cancel</div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-lg">Next</div>
            <button
              className={`bg-[#B2B2B2] text-white text-lg font-medium p-2 rounded-full ${allInputsFilled ? "" : "cursor-not-allowed opacity-50"}`}
              onClick={handleNextButtonClick}
              disabled={!allInputsFilled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Register1;
