const BASE_URL = "https://menha-backend.vercel.app/change-password";

export const changePassword = async (passwordPayload) => {
  try {
    const token = localStorage.getItem("token");

    // تحقق من وجود التوكن في localStorage
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

    // تحقق من حالة الاستجابة
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("Password changed successfully:", data);
    return data; // ارجع البيانات إذا كنت بحاجة لاستخدامها في مكان آخر
  } catch (error) {
    console.error("Error changing password:", error.message || error);
    throw error; // رمي الخطأ للتعامل معه في مكان آخر في التطبيق إذا لزم الأمر
  }
};
