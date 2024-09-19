import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Sidebar from "./Sidebar";
import ProfilePasswordForm from "./ProfilePasswordForm ";


const Profile = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-4">

      <div className="h-full col-span-1 md:col-span-4 lg:col-span-3">
        <Sidebar image={savedUser?.image} name={savedUser?.name} />
      </div>


      <div className="col-span-1 md:col-span-8 lg:col-span-9">
        <Routes>
          <Route path="" element={<ProfileForm name={savedUser?.name} email={savedUser.email} />} />
          <Route path="/password" element={<ProfilePasswordForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
