import React, { useState, useEffect } from "react";
import PrimaryButton from "../../ui/PrimaryButton";

const validateForm = (form) => {
  const errors = {};

  // Validate name
  if (!form.name.trim()) {
    errors.name = "Username is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
    errors.name = "Username must only contain alphabetic characters and spaces.";
  }

  // Validate image
  if (form.image && form.image instanceof File) {
    if (!/^image\//.test(form.image.type)) {
      errors.image = "Invalid image type. Only image files are allowed.";
    }
  } else if (!form.image) {
    errors.image = "Image file data must be provided.";
  }

  return errors;
};

const ProfileForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setForm({
        name: user.name || "",
        email: user.email || "",
        image: user.image || null
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      image: form.image ? URL.createObjectURL(form.image) : null
    };

    localStorage.setItem("user", JSON.stringify(userData));
    console.log("Changes saved", userData);
  };

  return (
    <form onSubmit={saveChanges} className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="name"
          id="username"
          value={form.name}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          disabled
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
          Upload Profile Image
        </label>
        <input
          type="file"
          id="image-upload"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>
      <PrimaryButton type="submit">Save Changes</PrimaryButton>
    </form>
  );
};

export default ProfileForm;
