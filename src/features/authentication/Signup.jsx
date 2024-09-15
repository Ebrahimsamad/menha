import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaImage,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signup } = useAuth();
  const navigate = useNavigate();

  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      password
    );
    const doPasswordsMatch = password === confirmPassword;
    const isValidUsername = username && username.length >= 6;
    setIsButtonDisabled(
      !(
        isValidUsername &&
        isValidEmail &&
        isValidPassword &&
        selectedImage &&
        doPasswordsMatch
      )
    );
  }, [username, email, password, confirmPassword, selectedImage]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userName", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await signup(formData);

      if (response && response.token) {
        navigate("/login");
      } else {
        console.error("Signup failed:", response.message);
      }
    } catch (error) {
      if (error.message === "Email already exists") {
        // toast.error("Email already exists, please use a different email.");
      } else {
        console.error("Error during signup:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password
  );
  const doPasswordsMatch = password === confirmPassword;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-[url('/3.jpg')]  bg-cover from-[#003a65] to-[#b92a3b] flex items-center justify-center">
      <div className="relative z-10 p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#003a65] text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters",
                },
              })}
              className="peer  h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="peer  h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
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
                    <FaTimesCircle className="mr-1" /> Invalid Email
                  </p>
                )
              )}
            </div>
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Password must be at least 8 characters, including at least one letter and one number",
                  },
                })}
                className="peer  h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#003a65]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center mt-1">
              {isValidPassword ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-1" /> Valid Password
                </p>
              ) : (
                password && (
                  <p className="text-red-600 flex items-center">
                    <FaTimesCircle className="mr-2 w-6 h-6" /> Password must
                    contain at least 8 characters, one letter, and one number.
                  </p>
                )
              )}
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="peer h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#003a65]"
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center mt-1">
              {doPasswordsMatch ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-1" /> Passwords match
                </p>
              ) : (
                confirmPassword && (
                  <p className="text-red-600 flex items-center">
                    <FaTimesCircle className="mr-1" /> Passwords do not match
                  </p>
                )
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label
              className="flex items-center"
              onClick={handleProfilePictureClick}
            >
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#003a65] bg-white cursor-pointer">
                <FaImage className="text-[#003a65]" />{" "}
              </div>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Profile Preview"
                  className="ml-4 w-20 h-20 rounded-full object-cover"
                />
              )}
            </label>
            <label
              htmlFor="file"
              className="ml-4 text-[#003a65] cursor-pointer"
            >
              Upload profile picture
            </label>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full py-3 rounded-lg transition duration-300 bg-[#b92a3b] hover:bg-[#a02234] text-white flex justify-center items-center"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-[#003a65] ">
            Already have an account?
            <Link to="/login" className="text-red-600 ml-2 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
