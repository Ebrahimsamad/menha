const BASE_URL = "https://menha-backend.vercel.app";

export const fetchScholarshipDetails = async (scholarshipId) => {
  try {
    const response = await fetch(`${BASE_URL}/scholarship/${scholarshipId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching scholarship details:", error);
  }
};
