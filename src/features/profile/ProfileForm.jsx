import React, {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import Spinner from "../../ui/Spinner";
import { updateProfile } from "../../services/UpdateProfile";
import toast from "react-hot-toast";
import SecondaryButton from "../../ui/SecondaryButton";
import { useNavigate } from "react-router-dom";

const validateForm = (data) => {
  const errors = {};

  if (!data.userName.trim()) {
    errors.userName = "Username is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(data.userName)) {
    errors.userName = "Username must only contain alphabetic characters and spaces.";
  }

  if (data.image && data.image instanceof File) {
    if (!/^image\//.test(data.image.type)) {
      errors.image = "Invalid image type. Only image files are allowed.";
    }
  } else if (!data.image) {
    errors.image = "Image file data must be provided.";
  }

  return errors;
};

const ProfileForm = ({ user, setUser }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      image: null
    }
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setValue("userName", user.userName || "");
      setValue("email", user.email || "");
      setValue("image", user.image || null);


    }
  }, [setValue, user]);

  const selectedImage = watch("image");
  const watchedUserName = watch("userName");

  useEffect(() => {
    if (selectedImage && selectedImage instanceof File) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview("");
    }
  }, [selectedImage]);

  useEffect(() => {
    if (currentUser) {
      const hasChanges =
        watchedUserName !== currentUser.userName || selectedImage !== currentUser.image;
      setIsChanged(hasChanges);
    }
  }, [watchedUserName, selectedImage, currentUser]);

  const onSubmit = async (data) => {
    clearErrors();
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, { type: "manual", message: validationErrors[key] });
      });
      return;
    }

    const updatedUser = {};
    if (data.userName && data.userName !== currentUser.userName) {
      updatedUser.userName = data.userName;
    }

    if (data.image && data.image !== currentUser.image) {
      updatedUser.image = data.image;
    }

    if (Object.keys(updatedUser).length === 0) {
      console.log("No changes to save");
      return;
    }

    try {
      setLoading(true);
      const res = updateProfile(updatedUser);
      toast.promise(res, {
        loading: "Updating...",
        success: "Profile updated successfully!",
        error: (error) => error.message
      });
      const user = await res;
      localStorage.setItem("user", JSON.stringify(user.user));
      setUser(user.user);
      setCurrentUser(user.user);
    } catch (err) {
      console.log("Error saving changes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-14 p-8 bg-white  rounded-lg shadow-lg">
     <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
          <h2 className="text-2xl font-bold text-[#003a65]">
            Edit Profile
          </h2>
          
        </div>

      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("userName")}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          disabled
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="image-upload" className="text-sm font-medium text-gray-700 flex items-center">
          <div className="flex mr-2 items-center justify-center w-10 h-10 rounded-full border border-[#003a65] bg-white cursor-pointer">
            <FaImage className="text-[#003a65]" />{" "}
          </div>
          {(imagePreview) && (
            <div>
              <img
                src={imagePreview}
                alt="Selected"
                className="mx-2 border w-14 h-14 border-gray-300 rounded-full"
              />
            </div>
          )}
          Upload Profile Image
        </label>
        <input
          type="file"
          id="image-upload"
          {...register("image")}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            setValue("image", e.target.files[0]);
          }}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isChanged || loading}
        className={`transition duration-300 bg-[#b92a3b] hover:bg-[#002b4c] text-white font-bold py-2 px-4 rounded-full me-2 ${!isChanged ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""
          }`}
      >
        {loading ? <Spinner /> : "Save Changes"}
      </button>
      <SecondaryButton onClick={()=>navigate("/profile/change-password")}>Change Password</SecondaryButton>
    </form>
  );
};

export default ProfileForm;
