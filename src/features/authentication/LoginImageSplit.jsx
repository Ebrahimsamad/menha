import React, { useState } from "react";
import { VscDash } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function LoginImageSplit() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welecome  Back",
      highlight: "Back",
    },
  ];

  return (
    <div className="flex justify-center items-center  shadow-lg h-full  bg-[#003a65]">
      <div className="flex flex-col justify-center items-center bg-[#003a65] text-white  w-full p-8">
        <img src="/logo.png" alt="Men7a Logo" className="w-28 h-12 mb-8" />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight leading-snug">
            {
              slides[currentSlide].title.split(
                slides[currentSlide].highlight
              )[0]
            }
            <br />
            <span className="text-[#e6a23c] text-3xl font-extrabold">
              {slides[currentSlide].highlight}
            </span>
          </h2>
        </div>
        <div className="mt-4 text-center w-full">
              <Link
                to="/forget-password"
                className="text-[#e6a23c] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="mt-4 text-center w-full">
              <p className="text-white">
                Don&apos;t have an account?
                <Link
                  to="/signup"
                  className="text-[#e6a23c] hover:underline ml-2"
                >
                  Sign up
                </Link>
              </p>
            </div>
      </div>
    </div>
  );
}
