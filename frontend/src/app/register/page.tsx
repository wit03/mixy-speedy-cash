"use client"
import React, { useState } from "react";
import Register1 from "./_component/Register1";
import Register2 from "./_component/Register2";
import Register3 from "./_component/Register3";
import Register4 from "./_component/Register4";

const Register = () => {
  const [page, setPage] = useState(1);

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

  return (
    <div className="px-6 py-9 h-screen">
      <div className="text-gray-800 font-rubik text-3xl font-semibold">
        Register
      </div>

      {page === 1 && (
        <div className="flex h-full">
          <Register1 onNextButtonClick={handleNextButtonClick} />
        </div>
      )}

      {page === 2 && (
        <div className="flex h-full">
          <Register2
            onNextButtonClick={handleNextButtonClick}
            onPreviousButtonClick={handlePreviousButtonClick}
          />
        </div>
      )}

      {page === 3 && (
        <div className="flex h-full">
          <Register3
            onNextButtonClick={handleNextButtonClick}
            onPreviousButtonClick={handlePreviousButtonClick}
          />
        </div>
      )}

      {page === 4 && (
        <div className="flex h-full">
          <Register4 />
        </div>
      )}
    </div>
  );
};

export default Register;
