import React from "react";
import { Link } from "react-router-dom";

const Afternavbar = () => {
  return (
    <div className="relative w-full">
      <div className="w-full h-[300px] sm:h-[500px] lg:h-[600px]">
        <img
          src="heroBG.jpg"
          alt="Menha Scholarship"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full bg-[#003a65] text-white flex flex-col justify-center p-4 sm:absolute sm:top-0 sm:right-0 sm:w-[40%] sm:h-full sm:p-6 lg:p-10 lg:pl-8">
        <div className="absolute top-0 left-[-40px] h-full w-[40px] bg-[#003a65] rounded-l-full"></div>

        <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-2 lg:mb-4 leading-tight">
          Study with a Menha Scholarship
        </h1>
        <div>
          <h2 className="text-5xl text-start text-white">
            Applications are open
          </h2>
        </div>
        <p className="text-sm sm:text-base lg:text-lg mb-4 lg:mb-6">
          We provide fully funded scholarships so that you can outpace your
          peers and return home with the skills, knowledge, and network required
          to influence the change you want to see.
        </p>
        <Link
          to="/scolarship"
          className="text-inherit underline decoration-[#8A690F] w-20 underline-offset-8 hover:underline hover:text-[#8A690F]"
        >
          Apply Now
        </Link>
      </div>
    </div  >
  );
};

export default Afternavbar;
