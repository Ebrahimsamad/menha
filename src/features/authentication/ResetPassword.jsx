import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import LoginImageSplit from "./LoginImageSplit";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const isValidPassword =
      newPassword &&
      /[A-Za-z]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      newPassword.length >= 8;

    const isPasswordMatched = newPassword === confirmPassword;
    setIsButtonDisabled(!(isValidPassword && isPasswordMatched));
  }, [newPassword, confirmPassword]);

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, email, data.newPassword, data.confirmPassword);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div className="min-h-screen  bg-cover from-[#003a65] to-[#b92a3b] flex items-center justify-center">
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#003a65] ">
          <LoginImageSplit />
        </div>

        <div className="w-full lg:w-1/2 p-6">
      <div className="relative z-10 p-6 ">
        <h2 className="text-3xl font-bold text-[#003a65] text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                pattern: {
                  value: /^[A-Za-z\d]{8,128}$/,
                  message:
                    "Password must be 8-128 characters and contain only letters and numbers",
                },
              })}
              className="h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="New Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.newPassword && (
              <p className="text-red-600 text-center mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
              className="h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-600 text-center mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="text-center">
            {newPassword && confirmPassword ? (
              newPassword === confirmPassword ? (
                <p className="text-green-600 flex justify-center items-center">
                  <FaCheckCircle className="mr-1" /> Passwords match
                </p>
              ) : (
                <p className="text-red-600 flex justify-center items-center">
                  <FaTimesCircle className="mr-1" /> Passwords do not match
                </p>
              )
            ) : null}
          </div>

          <div className="text-center text-gray-600 text-sm">
            <p>
              Password must be at least 8 characters, contain at least one
              letter, and one number.
            </p>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled || loading}
            className={`w-full py-3 rounded-lg transition duration-300 bg-[#b92a3b] hover:bg-[#a02234] text-white flex justify-center items-center ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                : ""
            }`}
          >
            {loading ? <Spinner /> : "Reset Password"}
          </button>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ResetPassword;
