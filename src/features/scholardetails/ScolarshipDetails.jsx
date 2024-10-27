import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Overview from "./Overview";
import CourseDetails from "./CourseDetails";
import CostsFunding from "./CostsAndFunding";
import AboutUniversity from "./AboutUnversity";
import Navbar from "./ScolarshipsNavbar";
import RepeatParagraph from "../../ui/RepeatParagrah";
import { fetchScholarshipDetails, fetchScholarshipDetailsWithPercentage } from "../../services/ScolarshipDetails";
import toast from "react-hot-toast";
import BlueButton from "../../ui/BlueButton";
import { toggle } from "../../services/SavedScholarship";
import { useAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../ui/Spinner";
import ContactScholarship from "./ContactScholarship";

export default function ScolarshipDetails() {
  const { scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoadingId, setSaveLoadingId] = useState("");
  const { sevedScholarship, setSevedScholarship } = useContext(UserContext);
  const { isAuthenticated } = useAuth();
  const [savedScholarships, setSavedScholarships] = useState(
    new Set(sevedScholarship)
  );

  useEffect(() => {
    const getScholarshipDetails = async () => {
      setLoading(true);
      try {
        const data = isAuthenticated? await fetchScholarshipDetailsWithPercentage(scholarshipId): await fetchScholarshipDetails(scholarshipId);
        setScholarship(data.scholarship);
      } catch (error) {
        toast.error(`Error loading scholarship details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getScholarshipDetails();
  }, [scholarshipId]);

  const handleSaveScholarship = async (id) => {
    if (!isAuthenticated)
      return toast.error("Please log in to save scholarships.");
    setSaveLoadingId(id);
    try {
      let updatedSaved = toggle(id);
      toast.promise(updatedSaved, {
        loading: savedScholarships.has(id) ? "Unsaving..." : "Saving...",
        success: savedScholarships.has(id)
          ? "Unsaved successfully!"
          : "Saved successfully!",
        error: "Please try again.",
      });

      const saved = await updatedSaved;
      setSavedScholarships(new Set(saved.savedScholarshipIds));
      setSevedScholarship(saved.savedScholarshipIds);
      localStorage.setItem(
        "savedScholarships",
        JSON.stringify(saved.savedScholarshipIds)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSaveLoadingId("");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 ">
        <div className="container mx-auto py-12">
          <div className="flex justify-center mb-8">
            <div className="animate-pulse w-full">
              <div className="h-10 bg-gray-300 rounded mb-4 mx-auto w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded mx-auto w-1/3"></div>
            </div>
          </div>
          <nav className="bg-white shadow-lg relative">
            <div className="container mx-auto p-4 flex justify-between items-center animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-12 md:w-40 md:h-8 bg-gray-300 rounded"></div>
              </div>

              <div className="lg:hidden flex items-center">
                <button className="text-[#003a65] focus:outline-none">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </button>
              </div>

              <ul
                className="hidden lg:flex space-x-6"
                style={{ color: "#003a65" }}
              >
                <li className="group">
                  <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
                </li>
                <li className="group">
                  <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
                </li>
                <li className="group">
                  <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
                </li>
                <li className="group">
                  <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
                </li>
              </ul>
            </div>

            <ul className="lg:hidden flex-col space-y-6 items-center bg-white absolute top-0 right-0 w-full h-screen p-6 z-20 transition-transform duration-300 transform translate-x-full animate-pulse">
              <li className="group">
                <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
              </li>
              <li className="group">
                <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
              </li>
              <li className="group">
                <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
              </li>
              <li className="group">
                <div className="h-6 bg-gray-300 w-32 rounded mb-2"></div>
              </li>
            </ul>
          </nav>
          <div className="mt-0">
            <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 w-3/4 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-full rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-3/4 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-full rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-3/4 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-full rounded"></div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 w-2/3 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-full rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-1/2 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 w-full rounded mb-4"></div>
                  <div className="h-40 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <p>No scholarship details available.</p>
        <img src="/Empty.gif" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center ms-3 ">
            <div>
              <RepeatParagraph>
                <h3 className=" text-3xl sm:text-5xl md:text-5xl  text-[#b92a3b] ">
                  {scholarship.title}
                </h3>
              </RepeatParagraph>
            </div>
            <div>
              <p className=" text-3xl sm:text-5xl md:text-2xl  text-[#002b4c]">
                {scholarship.universityId.name}
              </p>
            </div>
          </div>
          <div className="p-4 bg-white shadow-md mb-5 ">
          {scholarship.percentage&&<div className="text-[#003a65] font-semibold text-lg  text-center mb-2 me-2 md:me-0">
            <span className="hidden md:inline-block me-1">
            Matching - 
            </span>
            {scholarship.percentage}%
            </div>}
            
            <BlueButton onClick={() => handleSaveScholarship(scholarship._id)}>
              <div className="flex items-center">
                {saveLoadingId === scholarship._id ? (
                  <Spinner color="#a32233" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      savedScholarships.has(scholarship._id)
                        ? "#ffffff"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                      savedScholarships.has(scholarship._id)
                        ? "text-[#ffffff]"
                        : ""
                    }`}
                    disabled={saveLoadingId}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
                <span
                  className={`ps-2 text-lg font-medium transition-colors duration-200 hidden md:block
       "text-[#ffffff]" 
      `}
                >
                  {savedScholarships.has(scholarship._id) ? "Unsave" : "Save"}{" "}
                  Scholarship
                </span>
              </div>
            </BlueButton>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Navbar scholarshipId={scholarshipId} />
          <div className="mt-0">
            <Routes>
              <Route
                path=""
                element={
                  <Navigate
                    to={`/scolarshipdetails/${scholarshipId}/overview`}
                    replace
                  />
                }
              />
              <Route
                path="overview"
                element={<Overview scholarship={scholarship} />}
              />
              <Route
                path="course-details"
                element={<CourseDetails scholarship={scholarship} />}
              />
              <Route
                path="costs-funding"
                element={<CostsFunding scholarship={scholarship} />}
              />
              <Route
                path="about-university"
                element={<AboutUniversity scholarship={scholarship} />}
              />
            </Routes>
          </div>
          </div>
          <ContactScholarship scholarship={scholarship}/>
        </div>
      </div>
    </div>
  );
}
