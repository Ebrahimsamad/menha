const BASE_URL = "https://menha-backend.vercel.app";
export const getUserPortfolio = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://menha-backend.vercel.app/portfolio/user`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteUserPortfolio = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://menha-backend.vercel.app/portfolio/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

