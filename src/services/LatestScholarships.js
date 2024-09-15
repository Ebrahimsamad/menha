const BASE_URL = "https://menha-backend.vercel.app";

export const fetchScholarships = async (size = 3) => {
  try {
    const response = await fetch(`${BASE_URL}/scholarship?size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Try Again:", error);
    throw error;
  }
};
