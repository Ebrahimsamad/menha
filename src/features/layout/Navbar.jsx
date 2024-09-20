import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { user } = useContext(UserContext);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#003a65] text-white">
      <nav className="container mx-auto flex justify-between items-center py-3 md:py-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Men7a Logo"
            className="w-24 h-12 md:w-40 md:h-8 object-contain"
          />
        </Link>

        {/* Navigation Links for lg screens */}
        <ul className="hidden lg:flex space-x-8 items-center">
          <li className="group">
            <NavLink
              to="/dashboard"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/scholarships"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Scholarships
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/browse-scholarships"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              Browse Scholarships
            </NavLink>
          </li>
          <li className="group">
            <NavLink
              to="/about"
              className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            >
              About
            </NavLink>
          </li>

          {/* Conditionally render Search Icon for /dashboard route */}
          {location.pathname === "/dashboard" && (
            <li className="group">
              <a
                href="#search"
                className="bg-[#b92a3b] text-white transition-all duration-300 px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-white hover:text-[#b92a3b]"
              >
                <FiSearch size={20} />
                <span>Search</span>
              </a>
            </li>
          )}
        </ul>

        {/* Authentication Links */}
        <div className="hidden lg:flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to={"/profile"}>
                <div className="flex">

                  <span className="rounded-full overflow-hidden">
                    <img
                      src={user?.image || ""}
                      alt={user?.userName}
                      className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                    />
                  </span>
                  <span className="text-white px-3 py-2 rounded-md">
                    {user?.userName || "Guest"}
                  </span>
                </div>
              </Link>
              <button
                onClick={logout}
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Burger Menu Icon for mobile and medium devices */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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
      </nav>

      {/* Mobile and Medium Device Menu */}
      <ul
        className={`${isMenuOpen ? "flex mt-14" : "hidden"
          } lg:hidden flex-col space-y-6 items-center bg-[#003a65] absolute top-0 right-0 w-2/3 md:w-2/3 h-screen p-6 z-20 transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <li className="group">
          <NavLink
            to="/dashboard"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/scholarships"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Scholarships
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/browse-scholarships"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Browse Scholarships
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/about"
            className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </li>

        {/* Conditional Search Link with Icon for mobile */}
        {location.pathname === "/dashboard" && (
          <li className="group">
            <a
              href="#search"
              className="bg-[#b92a3b] text-white transition-all duration-300 px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-white hover:text-[#b92a3b]"
              onClick={toggleMenu}
            >
              <FiSearch size={20} />
              <span>Search</span>
            </a>
          </li>
        )}

        {/* Authentication Links for Mobile */}
        {isAuthenticated ? (
          <>
            <Link to={"/profile"}>

              <li className="group text-white flex items-center space-x-4" onClick={toggleMenu}>
                {/* User Image */}
                <span className="rounded-full overflow-hidden">
                  <img
                    src={user?.image || ""}
                    alt={user?.userName}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-full"
                  />
                </span>
                {/* Username */}
                <span className="px-3 py-2 rounded-md">
                  {user?.userName || "Guest"}
                </span>
              </li>
            </Link>
            <li className="group">
              <button
                onClick={()=>{logout(); toggleMenu()}}
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="group">
              <NavLink
                to="/login"
                className="hover:bg-[#b92a3b] hover:text-white transition-all duration-300 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Log In
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/signup"
                className="bg-[#b92a3b] text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-[#b92a3b]"
                onClick={toggleMenu}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
