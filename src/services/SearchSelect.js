const BASE_URL = "https://menha-backend.vercel.app";

export const getAllSelect=async()=>{

    const res1= await fetch(`${BASE_URL}/course-type`,{
        method: "GET",
      })
    const courseType = await res1.json();

    const res2= await fetch(`${BASE_URL}/language`,{
        method: "GET",
      })
    const courseLanguage = await res2.json();

    const res3= await fetch(`${BASE_URL}/field-of-study`,{
        method: "GET",
      })
    const fieldOfStudy = await res3.json();

    return {courseType, courseLanguage, fieldOfStudy};

}