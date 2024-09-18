

const BASE_URL = "https://menha-backend.vercel.app/change-password";

export const  changePassword = async(passwordPayload) =>{
    try {
        console.log
      
      const token = localStorage.getItem("token");
      console.log("token = " + token);
      const response = await fetch( BASE_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(passwordPayload)
      });
  
      const data = await response.json();
  
     
    } 
    catch (error) 
    {
      console.error("Error changing password:", error);
      
    }
    
  }
  