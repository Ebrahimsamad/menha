import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../ui/PrimaryButton";
import Spinner from "../../ui/Spinner";
import { changePassword } from "../../services/ChangePassword";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validateForm = (data) => {
  const errors = {};

  if (!data.currentPassword.trim()) {
    errors.currentPassword = "Current password is required.";
  }

  if (!data.newPassword.trim()) {
    errors.newPassword = "New password is required.";
  } else if (data.newPassword.length < 8) {
    errors.newPassword = "New password must be at least 8 characters long.";
  }

  if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "New password and confirmation password do not match.";
  }

  return errors;
};

const ProfilePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    clearErrors();
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, { type: "manual", message: validationErrors[key] });
      });
      return;
    }

    try {
      setLoading(true);
      const res = changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      toast.promise(res, {
        loading: "Updating password...",
        success: "Password updated successfully!",
        error: (error) => error.message,
      });

      await res;
      reset();
    } catch (err) {
      console.log("Password change failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-gradient-to-r from-white to-[#e9e9e9] rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
          <h2 className="text-2xl font-bold text-[#003a65]">
            Change Password
          </h2>
          
        </div>
      {/* Current Password Field */}
      <div className="mb-6 relative">
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="current-password"
            {...register("currentPassword")}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003a65] cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.currentPassword && <p className="text-red-600 text-sm mt-1">{errors.currentPassword.message}</p>}
      </div>

      {/* New Password Field */}
      <div className="mb-6 relative">
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="new-password"
            {...register("newPassword")}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003a65] cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="mb-6 relative">
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            {...register("confirmPassword")}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003a65] cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`transition duration-300 bg-[#b92a3b] hover:bg-[#002b4c] text-white font-bold py-2 px-4 rounded-full ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
      >
        {loading ? <Spinner /> : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfilePasswordForm;
