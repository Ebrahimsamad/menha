import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import LoginImageSplit from "./LoginImageSplit";

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { forgetPassword } = useAuth();

  const email = watch("email");

  useEffect(() => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    setIsButtonDisabled(!isValidEmail);
  }, [email]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgetPassword(data.email);
      setIsEmailSent(true);

      navigate(
        `/check-reset-password-token?email=${encodeURIComponent(data.email)}`
      );
    } catch (error) {
      console.error("Failed to send reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);

  return (
    <div className="min-h-screen   bg-cover from-[#003a65] to-[#b92a3b] flex items-center justify-center">
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#003a65] ">
          <LoginImageSplit />
        </div>

        <div className="w-full lg:w-1/2 p-6">
      <div className="relative z-10 p-6 ">
        <h2 className="text-3xl font-bold text-[#003a65] text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
                required: "Email is required",
              })}
              className="peer h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Email"
            />

            <div className="flex items-center mt-1">
              {isValidEmail ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-1" /> Valid Email
                </p>
              ) : (
                email && (
                  <p className="text-red-600 flex items-center">
                    <FaTimesCircle className="mr-1" />
                    {errors.email ? errors.email.message : "Invalid Email"}
                  </p>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled || loading}
            className={`w-full py-3 rounded-lg transition duration-300 bg-[#b92a3b] hover:bg-[#a02234] text-white flex justify-center items-center ${isButtonDisabled || loading ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
          >
            {loading ? <Spinner /> : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-[#b92a3b] hover:underline transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
