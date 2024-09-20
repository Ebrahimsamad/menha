/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function ScolarshipsNavbar({ scholarshipId }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/output-onlinepngtools.png"
            alt="Men7a Logo"
            className="w-24 h-12 md:w-40 md:h-8 object-contain"
          />
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#003a65] focus:outline-none">
            {isMenuOpen ? (
              <FiX size={28} className="hover:text-[#b92a3b] transition-colors" />
            ) : (
              <FiMenu size={28} className="hover:text-[#b92a3b] transition-colors" />
            )}
          </button>
        </div>


        <ul className="hidden lg:flex space-x-6" style={{ color: "#003a65" }}>
          <li className="group">
            <Link
              to={`/scolarshipdetails/${scholarshipId}/overview`}
              className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('overview') ? 'border-b-2 border-[#b92a3b]' : ''
                }`}
            >
              Overview
            </Link>
          </li>
          <li className="group">
            <Link
              to={`/scolarshipdetails/${scholarshipId}/course-details`}
              className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('course-details') ? 'border-b-2 border-[#b92a3b]' : ''
                }`}
            >
              Course Details
            </Link>
          </li>
          <li className="group">
            <Link
              to={`/scolarshipdetails/${scholarshipId}/costs-funding`}
              className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('costs-funding') ? 'border-b-2 border-[#b92a3b]' : ''
                }`}
            >
              Costs & Funding
            </Link>
          </li>
          <li className="group">
            <Link
              to={`/scolarshipdetails/${scholarshipId}/about-university`}
              className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('about-university') ? 'border-b-2 border-[#b92a3b]' : ''
                }`}
            >
              About University
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`${isMenuOpen ? "flex" : "hidden"
          } lg:hidden flex-col space-y-6 items-center bg-white absolute top-0 right-0 w-full h-screen p-6 z-20 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <li className="group">
          <Link
            to={`/scolarshipdetails/${scholarshipId}/overview`}
            className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('overview') ? 'border-b-2 border-[#b92a3b]' : ''
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Overview
          </Link>
        </li>
        <li className="group">
          <Link
            to={`/scolarshipdetails/${scholarshipId}/course-details`}
            className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('course-details') ? 'border-b-2 border-[#b92a3b]' : ''
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Course Details
          </Link>
        </li>
        <li className="group">
          <Link
            to={`/scolarshipdetails/${scholarshipId}/costs-funding`}
            className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('costs-funding') ? 'border-b-2 border-[#b92a3b]' : ''
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Costs & Funding
          </Link>
        </li>
        <li className="group">
          <Link
            to={`/scolarshipdetails/${scholarshipId}/about-university`}
            className={`hover:text-[#b92a3b] hover:border-b-2 hover:border-[#b92a3b] transition-all duration-300 pb-1 ${location.pathname.includes('about-university') ? 'border-b-2 border-[#b92a3b]' : ''
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About University
          </Link>
        </li>
      </ul>
    </nav>
  );
}
