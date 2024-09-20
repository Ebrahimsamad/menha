const BASE_URL = "https://menha-backend.vercel.app/update-profile";

export const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (userData.userName) formData.append("userName", userData.userName);
    if (userData.image) formData.append("image", userData.image);

    const response = await fetch(BASE_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to update profile");
    }

    return result;
  } catch (err) {
    throw err;
  }
};
