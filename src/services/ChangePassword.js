const BASE_URL = "https://menha-backend.vercel.app/change-password";

export const changePassword = async (passwordPayload) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in first.");
    }

    const response = await fetch(BASE_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(passwordPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error changing password:", error.message || error);
    throw error; 
  }
};
