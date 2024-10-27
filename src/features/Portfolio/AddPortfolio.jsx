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
import { getAllSelectData } from "../../services/Portfolio";
import BeforePortfolio from "./BeforePortfolio";
import Submitted from "./Submitted";
import { postPortfolio } from "../../services/PostPortfolio";
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
  const [error, setError] = useState(null);
  const location = useLocation();

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
        const data = await getAllSelectData();
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
    // const finalDataForBackend = {
    //   fieldOfStudyId: combinedData.fieldOfStudy,
    //   courseTypeId: combinedData.courseType,
    //   modeOfStudyId: combinedData.modeOfStudy,

    //   languageId:combinedData.language,
    //   isFree
    //   :
    //   combinedData.isFree,
    //   isFullTime
    //   :
    //   combinedData.isFullTime,
    //   isWinter
    //   :
    //   combinedData.isWinter,
    //   phone:combinedData.phone,
    //   levelOfStudy:combinedData.levelOfStudy,
    //   gender:combinedData.gender,
    //   dateOfBirthDate:combinedData.dateOfBirth,
    //   gpa: combinedData.gpaOption === "other" ? combinedData.gpa : combinedData.gpaOption,
    //   graduationImage:combinedData.graduationImage,
    //   IDImage:combinedData.IDImage,
    //   militaryStatusImage:combinedData.militaryStatusImage
    // };

    // console.log("finalDataForBackend:", finalDataForBackend);



    const formData = new FormData();
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
      // const token = localStorage.getItem("token");
      // const response = await postPortfolio(formData, token, {
      // });
      // console.log("Successfully added portfolio", response);

      navigate("/portfolio/submitted");
      setIsForm1Submitted(false);
      setIsForm2Submitted(false);
      localStorage.removeItem("form1Data");
      localStorage.removeItem("form2Data");
      setForm1Data({});
      setForm2Data({});
      localStorage.setItem("isForm1Submitted", JSON.stringify(false));
      localStorage.setItem("isForm2Submitted", JSON.stringify(false));
    } catch (error) {
      console.error("Error submitting the final data:", error);
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
