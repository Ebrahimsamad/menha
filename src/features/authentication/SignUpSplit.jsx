import React, { useState } from "react";
import { VscDash } from "react-icons/vsc";

export default function SecondWelcome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Create a personalized portfolio",
      highlight: "portfolio",
      description:
        "and view scholarships that match your unique profile perfectly.",
    },
    {
      title: "Unlock incredible savings",
      highlight: "savings",
      description:
        "on scholarship programs and enjoy exclusive benefits designed just for you!",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center items-center  shadow-lg h-full  bg-[#003a65] ">
      <div className="flex flex-col justify-center items-start bg-[#003a65] text-white  w-full p-8">
        <img src="/logo.png" alt="Men7a Logo" className="w-28 h-12 mb-8" />
        <div className="text-start space-y-4">
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
          <p className="text-sm font-light w-52">
            {slides[currentSlide].description}
          </p>
        </div>
        <div className="flex  mt-8 text-5xl font-semibold cursor-pointer select-none">
          <span onClick={handlePrevSlide} className="hover:text-[#e6a23c]">
            <VscDash />
          </span>
          <span onClick={handleNextSlide} className="hover:text-[#e6a23c]">
            <VscDash />
          </span>
        </div>
      </div>
    </div>
  );
}
