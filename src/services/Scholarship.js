const BASE_URL = "https://menha-backend.vercel.app";
export const getAllScholarships=async(filter)=>{
    const response = await fetch(`https://menha-backend.vercel.app/scholarship?${filter}`);
        const data = await response.json();
        return data;
}