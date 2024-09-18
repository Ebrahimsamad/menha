import { Link } from "react-router-dom";
import PrimaryButton from "../../ui/PrimaryButton";

const Afternavbar = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch bg-white h-auto lg:h-[50vh] w-full overflow-hidden">
      {/* Left side - Image */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto">
        <img
          src="/heroBG.jpg"
          alt="Chevening Scholarship Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Text */}
      <div className="w-full lg:w-1/2 bg-[#003a65] text-white p-6 md:p-10 lg:p-16 flex items-center justify-center">
        <div className="max-w-lg w-full text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Study with Men7a
          </h2>
          <p className="text-md md:text-lg text-[#B5A269] lg:text-xl italic mb-6">
            Applications are open!
          </p>
          <p className="mb-6">
            We provide fully funded scholarships so that you can outpace your
            peers and return home with the skills, knowledge, and network
            required to influence the change you want to see.
          </p>
          <PrimaryButton className="btn btn-primary bg-yellow-400 text-[#003a65] hover:bg-yellow-300">
            <Link to="/scholarships">Apply today</Link>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Afternavbar;
