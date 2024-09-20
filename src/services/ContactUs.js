const BASE_URL = "https://menha-backend.vercel.app";


export const contact = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/contact-us`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to send email");
        }
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};