// ProfilePasswordForm.js
import React, { useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import { changePassword } from "../../services/ChangePassword";
const ProfilePasswordForm = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordFieldsEnabled: true,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
      valid = false;
    }

    if (!form.newPassword) {
      newErrors.newPassword = "New password is required.";
      valid = false;
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long.";
      valid = false;
    }

    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "New password and confirmation password do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  

  const saveChanges = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      console.log("Password changes saved", form);
      changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword : form.confirmPassword
      });
      
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        passwordFieldsEnabled: true,
      });
      setErrors({});
    }


  };

  return (
    <form onSubmit={saveChanges} className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
      
      <div className="mb-6">
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          id="current-password"
          value={form.currentPassword}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.currentPassword && <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="new-password"
          value={form.newPassword}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={form.confirmPassword}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <PrimaryButton type="submit">Save Changes</PrimaryButton>
    </form>
  );
};

export default ProfilePasswordForm;
