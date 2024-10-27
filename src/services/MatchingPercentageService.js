const BASE_URL = "https://menha-backend.vercel.app/matching-percentage";
export const fetchMatchingPercentage = async () => {
  try {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message );

    }


    return data;
  } catch (error) {
    console.error( error.message);
    throw new Error(error.message );
  }
};