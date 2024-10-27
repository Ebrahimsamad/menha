/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { FaCheck } from "react-icons/fa"; 

export default function PortfolioNavbar({
    isForm1Submitted,
    isForm2Submitted,
  }) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <nav className="bg-white shadow-lg relative">
        
        <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="hidden lg:flex items-center w-full justify-between">
           

            <div className="flex-grow flex justify-around bg-gray-100 p-4 rounded-lg shadow-md">
           <div >

              <Link
                to="/portfolio/form1"
                className={`flex flex-col items-center space-y-2 ${
                  location.pathname.includes("form1")
                    ? "border-b-2 border-[#b92a3b] text-[#003a65] font-bold"
                    : `${isForm1Submitted?"text-[#003a65]":"text-gray-300"}`
                }`}
              >
                <div
                  className={`w-8 h-8 border-2 rounded-full flex items-center justify-center ${
                    isForm1Submitted
                      ? "bg-white border-[#003a65]"
                      : "bg-[#003a65]"
                  }`}
                >
                  {isForm1Submitted && (
                    <FaCheck className="text-[#003a65]" /> 
                  )}
                </div>
                <span>Personal Information</span>
              </Link>
           </div>
           <div>

              <Link
                to={isForm1Submitted ? "/portfolio/form2" : "#"}
                className={`flex flex-col items-center space-y-2 ${
                  location.pathname.includes("form2")
                    ? "border-b-2 border-[#b92a3b] text-[#003a65] font-bold"
                    : "text-gray-300  "
                }`}
              >
                <div
                  className={`w-8 h-8 border-2 rounded-full flex items-center justify-center ${
                    isForm2Submitted
                      ? "bg-white border-[#003a65]"
                      : `${location.pathname.includes("form2")?"bg-[#003a65]":"bg-gray-300"}   `
                  }`}
                >
                  {isForm2Submitted && (
                    <FaCheck className="text-[#003a65]" /> 
                  )}
                </div>
                <span>Scholarship Informations</span>
              </Link>
           </div>

            
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-[#003a65] focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX
                  size={28}
                  className="hover:text-[#b92a3b] transition-colors"
                />
              ) : (
                <FiMenu
                  size={28}
                  className="hover:text-[#b92a3b] transition-colors"
                />
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden flex-col space-y-6 items-center bg-white absolute top-0 right-0 w-full h-screen p-6 z-20 transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Link to="/dashboard" className="flex items-center">
              <img
                src="output-onlinepngtools.png"
                alt="Men7a Logo"
                className="w-24 h-12 md:w-40 md:h-8 object-contain"
              />
            </Link>
          </div>

          <ul className="space-y-6">
            <li>
              <Link
                to="portfolio/form1"
                className={`block py-2 px-4 ${
                  location.pathname.includes("form1")
                    ? "text-[#b92a3b] border-b-2 border-[#b92a3b]"
                    : "text-[#003a65]"
                } hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarship Form1
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio/form2"
                className={`block py-2 px-4 ${
                  location.pathname.includes("form2")
                    ? "text-[#b92a3b] border-b-2 border-[#b92a3b]"
                    : "text-[#003a65]"
                } hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarship Form2
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
