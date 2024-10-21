import React from 'react';

const Welcome = () => {
  return (
    <div className=" md:flex flex-col items-center justify-center bg-[#003a65] space-y-4"> 
      <img
        src="/logo.png"
        alt="Men7a Logo"
        className="w-24 h-12 mt-4 md:w-40 md:h-8 object-contain" 
      />
      <img
        src="/script.png"
        alt="Men7a Script"
        className="object-contain w-full h-auto max-h-[400px] max-w-[100%]" 
      />
    </div>
  );
};

export default Welcome;
