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
export const buyPortfolio = async (date, amount) => {
  const price = parseInt(amount);
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://menha-backend.vercel.app/portfolio/buy`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, price }),
      }
    );
    const dataResponse = await response.json();
    if (!response.ok) {
      throw new Error(dataResponse.message);
    }
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
export const freePlan = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://menha-backend.vercel.app/portfolio/free`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataResponse = await response.json();
    if (!response.ok) {
      throw new Error(dataResponse.message);
    }
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
