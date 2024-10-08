import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import Sidebar from "./Sidebar";
import ProfilePasswordForm from "./ProfilePasswordForm ";
import Info from "./Info";
import { UserContext } from "../../context/UserContext";
import Portfolio from "./Portfolio";


const Profile = () => {
  const { user ,setUser} = useContext(UserContext);

  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-4">

      <div className="h-full col-span-1 md:col-span-4 lg:col-span-3">
        <Sidebar user={user} />
      </div>


      <div className="col-span-1 md:col-span-8 lg:col-span-9">
        <Routes>

          <Route path="/" element={<Portfolio user={user}/>} />
          <Route path="/info" element={<Info user={user} />} />
          <Route path="/edit-profile" element={<ProfileForm user={user} setUser={setUser} />} />
          <Route path="/change-password" element={<ProfilePasswordForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
