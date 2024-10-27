import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

const Sidebar = ({ user }) => {
  return (
    <div className="p-6 rounded-lg text-white bg-[#003a65] h-full">
      <div className="text-center mb-4">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
          />
        )}
        <FaGraduationCap className="mx-auto text-4xl mb-2" />
        <h3 className="mt-4 text-xl font-semibold">{user.userName}</h3>
        <h5 className="mt-4 text-lg  md:text-sm lg:text-lg ">{user.email}</h5>

        <div className="mt-6 space-y-2">
          <Link
            to="/profile"
            className="block py-2 text-white hover:text-gray-300"
          >
            Portfolio
          </Link>
          <Link
            to="/profile/edit-profile"
            className="block py-2 text-white hover:text-gray-300"
          >
            Edit Profile
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
