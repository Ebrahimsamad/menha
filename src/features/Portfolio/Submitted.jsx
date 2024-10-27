import { Link } from "react-router-dom";
import RepeatParagrah from "../../ui/RepeatPara";

export default function Submitted() {
  return (
    <div className="bg-[#003A65] w-[700px] rounded-lg shadow-lg p-8 mx-auto mt-10">
      {/* Header section */}
      <div className="bg-[#002A45] p-6 rounded-t-lg text-center">
        <Link to="/dashboard">
          <img
            src="/public/logo.png"
            alt="Men7a Logo"
            className="h-16 w-auto mx-auto mb-4 object-contain"
          />
        </Link>
        <p className="text-white text-xl mt-2">Welcome to Our Service</p>
      </div>

      {/* Message section */}
      <div className="bg-white p-6 rounded-b-lg text-[#b92a3b] text-center">
        <h4 className=" mb-4 font-semibold  sm:text-5xl md:text-3xl">
          Your portfolio is under review.
        </h4>
        <RepeatParagrah>
        <p className="text-lg font-medium sm:text-5xl md:text-2xl text-[#b92a3b] ">
          Thank you for trusting us!
        </p>
        </RepeatParagrah>
       
      </div>
    </div>
  );
}
