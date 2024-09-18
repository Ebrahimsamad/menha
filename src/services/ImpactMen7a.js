const BASE_URL = "https://menha-backend.vercel.app";

export const impact = async()=>{
    const response = await fetch(`${BASE_URL}/men7a-impact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
}