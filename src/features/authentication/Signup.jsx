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
import SignUpSplit from "./SignUpSplit";

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
    const isValidUsername = username && username.length >= 6 && /^[a-zA-Z\s]+$/.test(username);
    setIsButtonDisabled(
      !(
        isValidUsername &&
        isValidEmail &&
        isValidPassword &&
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
        navigate("/dashboard");
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
  const isValidUsername = username && username.length >= 6 && /^[a-zA-Z\s]+$/.test(username);

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
    <div className="min-h-screen  bg-cover flex items-center justify-center mb-10">
      
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mt-5">
      <div className="w-full lg:w-1/2 bg-[#003a65]  ">
      <SignUpSplit />
      </div>
  
        <div className="w-full lg:w-1/2 p-6">
        <div className="relative z-10">
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
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Username can only contain letters and spaces",
                },
              })}
              className="peer h-12 w-full px-4 text-[#003a65] border-b-2 border-[#003a65] focus:border-[#b92a3b] focus:outline-none transition duration-300"
              placeholder="Username"
            />
            <div className="flex items-center mt-1">
              {isValidUsername ? (
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-1" /> Valid Username
                </p>
              ) : (
                username && (
                  <p className="text-red-600 flex items-center">
                    <FaTimesCircle className="mr-1" /> Username must be at least 6 characters and only contain letters and spaces
                  </p>
                )
              )}
            </div>
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
            disabled={isButtonDisabled || loading}
            className={`w-full py-3 rounded-lg transition duration-300 bg-[#b92a3b] hover:bg-[#a02234] text-white flex justify-center items-center ${isButtonDisabled || loading ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>

        
      </div>
      </div>

      </div>
    </div>
  );
};

export default Signup;
