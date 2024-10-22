import React, { useEffect, useState } from 'react';

export default function SecondWelcome() {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkIcon = (
    <svg
      className="w-13 h-10 text-[#e6a23c] inline-block mr-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );

  return (
    <div className="relative flex flex-col justify-center items-center text-white p-10 rounded-xl max-w-lg mx-auto">
      <img
        src="/logo.png"
        alt="Men7a Logo"
        className="w-24 h-12 mb-2 md:w-40 md:h-8 object-contain"
      />

      <div className="space-y-4 text-start max-w-md">
        <div className="flex items-start mb-4">
          {checkIcon}
          <div className="whitespace-normal">
            <p>Unlock incredible <span className="text-[#e6a23c] font-bold">savings</span> on scholarship programs and enjoy exclusive benefits designed just for you!</p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          {checkIcon}
          <div className="whitespace-normal">
            <p>Create a personalized <span className="text-[#e6a23c] font-bold">portfolio</span> to view scholarships that match your unique profile perfectly.</p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          {checkIcon}
          <div className="whitespace-normal">
            <p><strong>Plan 1:</strong> Our <span className="text-[#e6a23c] font-bold">Monthly Plan</span> gives you access to matching scholarships for just <span className="text-[#e6a23c] font-bold">$5</span> per month, with a first month <span className="text-[#e6a23c] font-bold">FREE!</span></p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          {checkIcon}
          <div className="whitespace-normal">
            <p><strong>Plan 2:</strong> Our <span className="text-[#e6a23c] font-bold">Three-Month Plan</span> is priced at <span className="text-[#e6a23c] font-bold">$10</span> for three months, and you'll receive personalized recommendations and matching scholarships sent directly to your email.</p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          {checkIcon}
          <div className="whitespace-normal">
            <p><strong>Plan 3:</strong> Our <span className="text-[#e6a23c] font-bold">Six-Month Plan</span> costs only <span className="text-[#e6a23c] font-bold">$20</span> for six months, with a <span className="text-[#e6a23c] font-bold">10% discount</span>. Plus, it includes email recommendations and matching scholarships, ensuring you get the best opportunities!</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 animate-bounce hover:animate-none">
        <span className="text-xl font-bold mr-2 tracking-wide hover:text-[#e6a23c] transition-colors duration-300">
          Start Now
        </span>
        <svg
          className={`w-10 h-10 text-[#8A690F] transform transition-transform duration-700 ${bounce ? 'translate-x-6' : 'translate-x-0'} md:rotate-0 rotate-90`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
}
