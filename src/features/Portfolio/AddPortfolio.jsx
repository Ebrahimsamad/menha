/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate, 
} from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import PortfolioNavbar from "./PortfolioNavbar";
import RepeatPara from "../../ui/RepeatPara";
import { getAllSelect } from "../../services/SearchSelect";
import BeforePortfolio from "./BeforePortfolio";
import Submitted from "./Submitted";
import { postPortfolio } from "../../services/PostPortfolio";
import { Link } from 'react-router-dom';
import { updatePortfolio } from './../../services/UpdatePortfolio';
import { DotLoader } from "react-spinners";
import toast from "react-hot-toast";
export default function AddPortfolio() {
  const navigate = useNavigate();
  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const [isForm2Submitted, setIsForm2Submitted] = useState(false);
  const [courseType, setCourseType] = useState([]);
  const [courseLanguage, setCourseLanguage] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [modeOfStudy, setModeOfStudy] = useState([]);
  const [university, setUniversity] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitloading, setsubmitloading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const [editMode, setEditMode] = useState(false);
  console.log("this is edit mode from parent",editMode)
  const [id, setId] = useState(null);
  console.log("this is edit mode from parent",editMode)
  console.log("this is id mode from parent",id)


  useEffect(() => {
    const form1State = localStorage.getItem("isForm1Submitted");
    const form2State = localStorage.getItem("isForm2Submitted");
    const savedForm1Data = localStorage.getItem("form1Data");
    const savedForm2Data = localStorage.getItem("form2Data");

    if (
      form1State !== "false" &&
      form1State !== null &&
      form1State !== "undefined"
    ) {
      setIsForm1Submitted(JSON.parse(form1State));
    }

    if (form2State !== null && form2State !== "undefined") {
      setIsForm2Submitted(JSON.parse(form2State));
    }

    if (savedForm1Data && savedForm1Data !== "undefined") {
      setForm1Data(JSON.parse(savedForm1Data));
    }

    if (savedForm2Data && savedForm2Data !== "undefined") {
      setForm2Data(JSON.parse(savedForm2Data));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllSelect();
        setCourseType(data.courseType);
        setCourseLanguage(data.courseLanguage);
        setFieldOfStudy(data.fieldOfStudy);
        setModeOfStudy(data.modeOfStudy);
        setUniversity(data.university);
        setScholarships(data.scholarships);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleForm1Submit = (data) => {
    setForm1Data(data);

    setIsForm1Submitted(true);
    localStorage.setItem("form1Data", JSON.stringify(data));
    localStorage.setItem("isForm1Submitted", JSON.stringify(true));
  };

  const handleForm2Submit = async (data) => {
    setForm2Data(data);
    setIsForm2Submitted(true);
    localStorage.setItem("form2Data", JSON.stringify(data));
    localStorage.setItem("isForm2Submitted", JSON.stringify(true));
    const combinedData = {
      ...form1Data,
      ...form2Data,
      ...data,
    };
    // console.log("finalDataForBackend FROM CHILED MOTHER FUCKER:",combinedData);
       // const formData = new FormData();
    let formData;
    console.log("before form",editMode)

    if (String(editMode) === 'true') {
      console.log("formmmmm1",editMode)
    
      formData = new FormData();
      formData.append("fieldOfStudyId", combinedData.fieldOfStudy);
    formData.append("courseTypeId", combinedData.courseType);
    formData.append("modeOfStudyId", combinedData.modeOfStudy);
    formData.append("languageId", combinedData.language);
    formData.append("isFree", combinedData.isFree);
    formData.append("isFullTime", combinedData.isFullTime);
    formData.append("isWinter", combinedData.isWinter);
    formData.append("phone", combinedData.phone);
    formData.append("levelOfStudy", combinedData.levelOfStudy);
    formData.append("gender", combinedData.gender);
    formData.append("dateOfBirthDate", combinedData.dateOfBirth);
    formData.append("gpa",combinedData.gpa);

    // if (combinedData.graduationImage) {
    //   formData.append("graduationImage", combinedData.graduationImage);
    //   console.log(
    //     "File type check:",
    //     combinedData.graduationImage instanceof File
    //   );
    //   console.log("militaryStatusImage:", combinedData.graduationImage);
    // }
    // if (combinedData.IDImage) {
    //   formData.append("IDImage", combinedData.IDImage);
    //   console.log("File type check:", combinedData.IDImage instanceof File);
    //   console.log("IDImage:", combinedData.IDImage);
    // }
    // if (combinedData.militaryStatusImage) {
    //   formData.append("militaryStatusImage", combinedData.militaryStatusImage);
    //   console.log(
    //     "File type check:",
    //     combinedData.militaryStatusImage instanceof File
    //   );
    //   console.log("militaryStatusImage:", combinedData.militaryStatusImage);
    // }
    console.log(combinedData.militaryStatusImage.name);
    console.log(combinedData.militaryStatusImage.size);
    console.log(combinedData.IDImage.name);
    console.log(combinedData.IDImage.size);




  
   
if (combinedData.graduationImage && combinedData.graduationImage.name !== undefined) {
    formData.append("graduationImage", combinedData.graduationImage);
    console.log("photo1", combinedData.graduationImage);
}


if (combinedData.IDImage && combinedData.IDImage.name !== undefined) {
    formData.append("IDImage", combinedData.IDImage);
    console.log(combinedData.IDImage);
}

if (combinedData.militaryStatusImage && combinedData.militaryStatusImage.name !== undefined) {
    formData.append("militaryStatusImage", combinedData.militaryStatusImage);
    console.log(combinedData.militaryStatusImage);
}





    console.log("finalDataForBackend (FormData):", formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      setsubmitloading(true);
      const token = localStorage.getItem("token");
      const res =  updatePortfolio(formData,id, token, {
      });
      toast.promise(res, {
        loading: "editing portfolio...",
        success: "edited portfolio successfully!",
        error: (error) => error.message,
      });
      const response=await res
      console.log("Successfully Update portfolio", response);

      navigate("/portfolio/submitted");
      setIsForm1Submitted(false);
      setIsForm2Submitted(false);
      localStorage.removeItem("form1Data");
      localStorage.removeItem("form2Data");
      localStorage.removeItem("id");
      localStorage.removeItem("editMode");
      localStorage.removeItem("graduationImage");
      localStorage.removeItem("IDImage");
      localStorage.removeItem("militaryStatusImage");
      setForm1Data({});
      setForm2Data({});
      localStorage.setItem("isForm1Submitted", JSON.stringify(false));
      localStorage.setItem("isForm2Submitted", JSON.stringify(false));
    } catch (error) {
      console.error("Error submitting the final data:", error);
    }
    finally {
      setsubmitloading(false);
    }
  
  
    } else {
      console.log("formmmmm22222",editMode)
 
      formData = new FormData();
      formData.append("fieldOfStudyId", combinedData.fieldOfStudy);
      formData.append("courseTypeId", combinedData.courseType);
      formData.append("modeOfStudyId", combinedData.modeOfStudy);
      formData.append("languageId", combinedData.language);
      formData.append("isFree", combinedData.isFree);
      formData.append("isFullTime", combinedData.isFullTime);
      formData.append("isWinter", combinedData.isWinter);
      formData.append("phone", combinedData.phone);
      formData.append("levelOfStudy", combinedData.levelOfStudy);
      formData.append("gender", combinedData.gender);
      formData.append("dateOfBirthDate", combinedData.dateOfBirth);
      formData.append(
        "gpa",
        combinedData.gpaOption === "other"
          ? combinedData.gpa
          : combinedData.gpaOption
      );
  
      if (combinedData.graduationImage) {
        formData.append("graduationImage", combinedData.graduationImage);
        console.log(
          "File type check:",
          combinedData.graduationImage instanceof File
        );
        console.log("militaryStatusImage:", combinedData.graduationImage);
      }
      if (combinedData.IDImage) {
        formData.append("IDImage", combinedData.IDImage);
        console.log("File type check:", combinedData.IDImage instanceof File);
        console.log("IDImage:", combinedData.IDImage);
      }
      if (combinedData.militaryStatusImage) {
        formData.append("militaryStatusImage", combinedData.militaryStatusImage);
        console.log(
          "File type check:",
          combinedData.militaryStatusImage instanceof File
        );
        console.log("militaryStatusImage:", combinedData.militaryStatusImage);
      }
  
      console.log("finalDataForBackend (FormData):", formData);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      try {
        setsubmitloading(true);
        const token = localStorage.getItem("token");
        const res =  postPortfolio(formData, token, {
        });
        toast.promise(res, {
          loading: "adding portfolio...",
          success: "added portfolio successfully!",
          error: (error) => error.message,
        });
        const response=await res
        console.log("Successfully added portfolio", response);
  
        navigate("/portfolio/submitted");
        setIsForm1Submitted(false);
        setIsForm2Submitted(false);
        localStorage.removeItem("form1Data");
        localStorage.removeItem("form2Data");
        localStorage.removeItem("graduationImage");
        localStorage.removeItem("IDImage");
        localStorage.removeItem("militaryStatusImage");
        setForm1Data({});
        setForm2Data({});
        localStorage.setItem("isForm1Submitted", JSON.stringify(false));
        localStorage.setItem("isForm2Submitted", JSON.stringify(false));
      } catch (error) {
        console.error("Error submitting the final data:", error);
      }
      finally {
        setsubmitloading(false);
      }
    }
    };
  useEffect(() => {
    if (location.pathname === "/portfolio" || location.pathname === "/portfolio/") {
      const timer = setTimeout(() => {
        navigate("/portfolio/form1");
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  if(submitloading){
    return (
      <div className="w-100 h-[60vh] text-3xl flex items-center justify-center">
        <DotLoader color="#B92A3B" size={80} />
      </div>
    );
  }



  if (loading) {
    return (
      <div className="bg-gray-100 ">
      <div className="container mx-auto py-12">
        <div className="flex justify-center mb-8">
          <div className="animate-pulse w-full">
            <div className="h-10 bg-gray-300 rounded mb-4 mx-auto w-1/2"></div>
            {/* <div className="h-6 bg-gray-300 rounded mx-auto w-1/3"></div> */}
          </div>
        </div>
  
        <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Skeleton Loader for Logo */}
        <div className="hidden lg:flex items-center w-full justify-between">
          <Link to="/dashboard" className="flex items-center mb-4 lg:mb-0">
            <div className="skeleton-loader w-24 h-12 md:w-40 md:h-8 bg-gray-300 rounded"></div>
          </Link>

          {/* Skeleton Loader for Navigation Links */}
          <div className="flex-grow flex justify-around bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center space-y-2">
              <div className="skeleton-loader w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="skeleton-loader w-24 h-4 bg-gray-300 rounded mt-2"></div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="skeleton-loader w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="skeleton-loader w-24 h-4 bg-gray-300 rounded mt-2"></div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="skeleton-loader w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="skeleton-loader w-24 h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Loader for Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button className="text-[#003a65] focus:outline-none">
            <div className="skeleton-loader w-8 h-8 bg-gray-300 rounded"></div>
          </button>
        </div>
      </div>

      {/* Skeleton Loader for Mobile Menu */}
       <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:hidden flex-col space-y-6 items-center bg-white absolute top-0 right-0 w-full h-screen p-6 z-20 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Skeleton Loader for Logo */}
         <div className="flex items-center justify-center mb-6">
          <div className="skeleton-loader w-40 h-8 bg-gray-300 rounded"></div>
        </div> 

        {/* Skeleton Loader for Mobile Menu Links */}
        <ul className="space-y-6">
          <li>
            <div className="skeleton-loader w-3/4 h-6 bg-gray-300 rounded"></div>
          </li>
          <li>
            <div className="skeleton-loader w-3/4 h-6 bg-gray-300 rounded"></div>
          </li>
          <li>
            <div className="skeleton-loader w-3/4 h-6 bg-gray-300 rounded"></div>
          </li>
        </ul>
      </div>
    </nav>
  
          {/* Skeleton Loader for Form Section */}
          
          <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="space-y-6">
          {/* Title skeleton */}
          <div className="flex items-center">
            <div className="w-20 h-6 bg-gray-300 rounded-md"></div>
            <div className="ml-2 w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>

          {/* Description skeleton */}
          <div className="flex items-center">
            <div className="w-28 h-6 bg-gray-300 rounded-md"></div>
            <div className="ml-2 w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-full h-20 bg-gray-300 rounded-md"></div>

          {/* GPA skeleton */}
          <div className="flex items-center">
            <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
            <div className="ml-2 w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>

          {/* Button skeleton */}
          <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="flex justify-center mb-8">
          {location.pathname !== "/portfolio" &&
            location.pathname !== "/portfolio/submitted" &&
            location.pathname !== "/portfolio/" && (
              <RepeatPara>
                <h3 className="text-center sm:text-5xl md:text-7xl">
                  New Portfolio
                </h3>
              </RepeatPara>
            )}
        </div>

        {location.pathname !== "/portfolio" &&
          location.pathname !== "/portfolio/submitted" &&
          location.pathname !== "/portfolio/" && (
            <PortfolioNavbar
              isForm1Submitted={isForm1Submitted}
              isForm2Submitted={isForm2Submitted}
            />
          )}

        <div className="mt-0">
          <Routes>
            <Route path="/" element={<BeforePortfolio />} />
            <Route
              path="form1"
              element={
                <Form1
                  onSubmitSuccess={handleForm1Submit}
                  courseTypes={courseType}
                  courseLanguages={university}
                  fieldsOfStudy={fieldOfStudy}
                  setCourseType={setCourseType}
                  setFieldOfStudy={setFieldOfStudy}
                  setEditMode={setEditMode}
                  setId={setId}
                />
              }
            />
            <Route
              path="form2"
              element={
                <Form2
                  onSubmitSuccess={handleForm2Submit}
                  modeOfStudy={modeOfStudy}
                  courseLanguage={courseLanguage}
                />
              }
            />
            <Route path="submitted" element={<Submitted />} />
            <Route path="beforePortfolio" element={<BeforePortfolio />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
