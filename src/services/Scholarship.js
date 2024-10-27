const BASE_URL = "https://menha-backend.vercel.app";
export const getAllScholarships = async (filter) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`https://menha-backend.vercel.app/scholarship/?${filter}`);
    const data = await response.json();
    return data;
}
export const getAllScholarshipsWithPercentage = async (filter) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`https://menha-backend.vercel.app/scholarship/percentage?${filter}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    const data = await response.json();
    return data;
}