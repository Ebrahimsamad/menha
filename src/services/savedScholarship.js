const BASE_URL = "https://menha-backend.vercel.app/saved-scholarship";

export const getSaveScholarship = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/all`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      }});

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to get saved");
    }

    return result.scholarships;
  } catch (err) {
    throw err;
  }
};
export const toggle = async (id) => {
    try {
        console.log(id);
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ scholarshipId: id }), 
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to toggle save");
        }
        return result;
    } catch (error) {
        throw error;
    }
};
