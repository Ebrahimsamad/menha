import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";

const CheckToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkResetPasswordToken } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[url('3.jpg')]  bg-cover from-[#003a65] to-[#b92a3b] flex items-center justify-center">
      <div className="relative z-10 p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#003a65] text-center mb-6">
          Check Reset Token
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              {...register("token", {
                required: "Token is required",
              })}
              className="h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Enter Token"
            />
            {errors.token && (
              <p className="text-red-600 text-center mt-1">
                {errors.token.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="h-12 w-full bg-[#b92a3b] text-white rounded-lg font-semibold hover:bg-[#a52633] transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Verify Token"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckToken;
