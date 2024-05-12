"use client";
import React, { useState } from "react";
import Register1 from "./_component/Register1";
import Register2 from "./_component/Register2";
import Register3 from "./_component/Register3";
import Register4 from "./_component/Register4";

const Register = () => {
  const [page, setPage] = useState(1);
  // page 1
  const [identity, setIdentity] = useState(new Array(13).fill(""));
  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [firstName, setFirstName] = useState("chitsanupong");
  const [lastName, setLastName] = useState("jateassavapirom");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0948652696");
  const [address, setAddress] = useState("Pathumthani lumkukka kuay");

  // page 2
  const [salary, setSalary] = useState<number>(10000);
  const [career, setCareer] = useState("software engineer");
  const [company, setCompany] = useState("mixy company");

  // page 3
  const [email, setEmail] = useState("mark@gmail.com");
  const [password, setPassword] = useState("123");

  // page 4
  const [pin, setPin] = useState(new Array(6).fill(""));


  const handleNextButtonClick = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  async function handleRegister() {
    
  }

  return (
    <div className="px-6 py-9 h-screen">
      <div className="text-gray-800 font-rubik text-3xl font-semibold">
        Register
      </div>

      <div className={page === 1 ? "flex h-full" : "hidden"}>
        <Register1 
        identity={identity}
        setIdentity={setIdentity}
        activeIdentityIndex={activeIdentityIndex}
        setActiveIdentityIndex={setActiveIdentityIndex}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        dob={dob}
        setDob={setDob}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        address={address}
        setAddress={setAddress}
        onNextButtonClick={handleNextButtonClick} />
      </div>
      <div className={page === 2 ? "flex h-full" : "hidden"}>
        <Register2
          onNextButtonClick={handleNextButtonClick}
          onPreviousButtonClick={handlePreviousButtonClick}
          salary={salary}
          setSalary={setSalary}
          career={career}
          setCareer={setCareer}
          company={company}
          setCompany={setCompany}
        />
      </div>
      <div className={page === 3 ? "flex h-full" : "hidden"}>
        <Register3
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
          onNextButtonClick={handleNextButtonClick}
          onPreviousButtonClick={handlePreviousButtonClick}
        />
      </div>
      <div className={page === 4 ? "flex h-full" : "hidden"}>
        <Register4
        pin={pin}
        setPin={setPin}
        />
      </div>
    </div>
  );
};

export default Register;
