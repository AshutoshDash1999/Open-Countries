import React from "react";

function ErrorMsg() {
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#404040"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-xl font-semibold text-neutral-800">Something is wrong. Please check network or your input.</p>
    </div>
  );
}

export default ErrorMsg;
