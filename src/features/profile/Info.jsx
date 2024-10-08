import React from "react";
import { useNavigate } from "react-router-dom";

export default function Info({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="border rounded-lg shadow-lg p-6 mb-8 bg-gradient-to-r from-white to-[#e9e9e9] ">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
          <h2 className="text-2xl font-bold text-[#003a65]">
            Personal Information
          </h2>
          <button className="p-2 rounded-full hover:bg-white focus:outline-none transition-colors duration-200" onClick={()=>{navigate("/profile/edit-profile")}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#003a65]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center pb-8 pt-5">
          <img
            src={user.image}
            alt={`${user.name}'s profile`}
            className="w-32 h-32 rounded-full border-4 border-[#003a65] shadow-lg mb-5"
          />

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <h3 className="text-xl font-semibold text-[#003a65] me-2">
                User Name:{" "}
              </h3>
              <p className="text-gray-500">{user.userName}</p>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="text-xl font-semibold text-[#003a65] me-2">
                Email:{" "}
              </h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
          </>
  );
}
