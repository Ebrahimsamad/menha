import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";
import LoginImageSplit from "./LoginImageSplit";
import ForgetImageSplit from "./ForgetImageSplit";

const CheckToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkResetPasswordToken } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const token = watch("token");

  useEffect(() => {
    const isValidToken = /^[a-zA-Z0-9]+$/.test(token);
    setIsButtonDisabled(!isValidToken);
  }, [token]);

  const onSubmit = async (data) => {
    const { token } = data;

    try {
      setLoading(true);
      await checkResetPasswordToken(email, token);

      navigate(
        `/reset-password?email=${encodeURIComponent(
          email
        )}&token=${encodeURIComponent(token)}`
      );
    } catch (error) {
      console.error("Token validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen   bg-cover from-[#003a65] to-[#b92a3b] flex items-center justify-center">
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-[#003a65] ">
        <ForgetImageSplit />
        </div>

        <div className="w-full lg:w-1/2 p-6">
      <div className="relative z-10 p-6 ">
        <h2 className="text-3xl font-bold text-[#003a65] text-center mb-6">
          Check Your Email
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              {...register("token", {
                required: "Token is required",
              })}
              className="h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Enter code"
            />
            {errors.token && (
              <p className="text-red-600 text-center mt-1">
                {errors.token.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`h-12 w-full bg-[#b92a3b] text-white rounded-lg font-semibold hover:bg-[#a52633] transition duration-300 flex items-center justify-center ${isButtonDisabled || loading ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
            disabled={loading || isButtonDisabled}
          >
            {loading ? <Spinner /> : "Verify Code"}
          </button>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default CheckToken;
