import React, { useEffect, useState } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";
import { getAllSelect } from "../../services/SearchSelect";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [courseType, setCourseType] = useState([]);
  const [courseLanguage, setCourseLanguage] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [modeOfStudy, setModeOfStudy] = useState([]);
  const [university, setUniversity] = useState([]);
  const [selectedModeOfStudy, setSelectedModeOfStudy] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isWinter, setIsWinter] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [isFullTime, setIsFullTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllSelect();
        setCourseType(data.courseType);
        setCourseLanguage(data.courseLanguage);
        setFieldOfStudy(data.fieldOfStudy);
        setModeOfStudy(data.modeOfStudy);
        setUniversity(data.university);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    // Open sidebar by default on large screens (LG and up)
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCourseType(params.get("courseTypeId") || "");
    setSelectedLanguage(params.get("languageId") || "");
    setSelectedFieldOfStudy(params.get("fieldOfStudy") || "");
  }, [location.search]);

  const handleFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCourseType) params.append("courseTypeId", selectedCourseType);
    if (selectedLanguage) params.append("languageId", selectedLanguage);
    if (selectedFieldOfStudy)
      params.append("fieldOfStudy", selectedFieldOfStudy);
    if (selectedModeOfStudy)
      params.append("modeOfStudyId", selectedModeOfStudy);
    if (selectedUniversity) params.append("universityId", selectedUniversity);
    if (isWinter) params.append("isWinter", true);
    if (isFree) params.append("isFree", true);
    if (isFullTime) params.append("isFullTime", true);
    params.append("page", 1);

    navigate(`/scholarships?${params.toString()}`);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedCourseType("");
    setSelectedLanguage("");
    setSelectedFieldOfStudy("");
    setSelectedModeOfStudy("");
    setSelectedUniversity("");
    setIsWinter(false);
    setIsFree(false);
    setIsFullTime(false);
    navigate("/scholarships");
    setIsOpen(false);
  };

  return (
    <div
      className={`relative  bg-white border-r border-r-border-base shadow-lg transition-all duration-300 ${
        isOpen ? "w-full md:w-96" : "w-0 lg:w-24"
      } `}
    >
      <button
        className={` absolute top-3 z-40 ${
          isOpen
            ? "right-3 rounded-full"
            : "right-[-30px] lg:right-[-32px] rounded-e-full h-14"
        } bg-[#B92A3B]  text-white p-1   transition-all duration-300 hover:bg-white hover:text-[#B92A3B]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M15.75 19.5 8.25 12l7.5-7.5"
                  : "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              }
            />
          </svg>
        </div>
      </button>
      <div className="relative flex flex-col h-full">
        <div className="flex flex-col w-full h-full mt-5 text-black">
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-col w-full h-full px-4 pb-32">
              {isOpen ? (
                <form onSubmit={handleFilter}>
                  <div className="space-y-8">
                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                            />
                          </svg>
                          <p className="ms-1">Course Type</p>
                        </div>
                      </legend>
                      <select
                        value={selectedCourseType}
                        onChange={(e) => setSelectedCourseType(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select Course Type</option>
                        {courseType.length === 0 ? (
                          <option>Loading...</option>
                        ) : (
                          courseType.map((type) => (
                            <option key={type._id} value={type._id}>
                              {type.courseType}
                            </option>
                          ))
                        )}
                      </select>
                    </fieldset>
                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                            />
                          </svg>
                          <p className="ms-1">Course Language</p>
                        </div>
                      </legend>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select Language</option>
                        {courseLanguage.length === 0 ? (
                          <option>Loading...</option>
                        ) : (
                          courseLanguage.map((language) => (
                            <option key={language._id} value={language._id}>
                              {language.name}
                            </option>
                          ))
                        )}
                      </select>
                    </fieldset>
                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                          </svg>

                          <p className="ms-1">Field of Study</p>
                        </div>
                      </legend>
                      <select
                        value={selectedFieldOfStudy}
                        onChange={(e) =>
                          setSelectedFieldOfStudy(e.target.value)
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select Field of Study</option>
                        {fieldOfStudy.length === 0 ? (
                          <option>Loading...</option>
                        ) : (
                          fieldOfStudy.map((field) => (
                            <option key={field._id} value={field._id}>
                              {field.fieldOfStudy}
                            </option>
                          ))
                        )}
                      </select>
                    </fieldset>
                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                            />
                          </svg>

                          <p className="ms-1">Mode of Study</p>
                        </div>
                      </legend>
                      <select
                        value={selectedModeOfStudy}
                        onChange={(e) => setSelectedModeOfStudy(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select Mode of Study</option>
                        {modeOfStudy.length === 0 ? (
                          <option>Loading...</option>
                        ) : (
                          modeOfStudy.map((mode) => (
                            <option key={mode._id} value={mode._id}>
                              {mode.modeOfStudy}
                            </option>
                          ))
                        )}
                      </select>
                    </fieldset>
                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                            />
                          </svg>

                          <p className="ms-1">University</p>
                        </div>
                      </legend>
                      <select
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select University</option>
                        {university.length === 0 ? (
                          <option>Loading...</option>
                        ) : (
                          university.map((uni) => (
                            <option key={uni._id} value={uni._id}>
                              {uni.name}
                            </option>
                          ))
                        )}
                      </select>
                    </fieldset>

                    <fieldset className="w-full">
                      <legend className="block text-sm font-medium">
                        <div className="flex mb-3 text-[#003a65]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3v15.6m0 0L4.5 12m7.5 6.6L19.5 12m-7.5 0L12 3m0 15.6L19.5 12m-7.5 6.6L4.5 12"
                            />
                          </svg>
                          <p className="ms-1">Additional Filters</p>
                        </div>
                      </legend>
                      <div className=" flex flex-col">
                        <label>
                          <input
                            type="checkbox"
                            checked={isWinter}
                            onChange={() => setIsWinter(!isWinter)}
                            className="me-2"
                          />
                          Winter Semester
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={isFree}
                            onChange={() => setIsFree(!isFree)}
                            className="me-2"
                          />
                          Free Course
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={isFullTime}
                            onChange={() => setIsFullTime(!isFullTime)}
                            className="me-2"
                          />
                          Full Time
                        </label>
                      </div>
                    </fieldset>

                    <div className="flex flex-col w-full  justify-between mt-4 space-y-2 ">
                      <PrimaryButton type="submit" disabled={loading}>
                        Filter
                      </PrimaryButton>
                      <SecondaryButton type="button" onClick={handleReset}>
                        Reset
                      </SecondaryButton>
                    </div>
                  </div>
                </form>
              ) : (
                <img
                  src="fBg.png"
                  className="cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
