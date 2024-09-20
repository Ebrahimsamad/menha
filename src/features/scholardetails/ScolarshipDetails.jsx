import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Overview from "./Overview";
import CourseDetails from "./CourseDetails";
import CostsFunding from "./CostsAndFunding";
import AboutUniversity from "./AboutUnversity";
import Navbar from "./ScolarshipsNavbar";
import RepeatParagraph from "../../ui/RepeatParagrah";
import { fetchScholarshipDetails } from "../../services/ScolarshipDetails";
import toast from "react-hot-toast";

export default function ScolarshipDetails() {
  const { scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    const getScholarshipDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchScholarshipDetails(scholarshipId);
        setScholarship(data.scholarship);
      } catch (error) {
        setError(error);
        toast.error(`Error loading scholarship details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getScholarshipDetails();
  }, [scholarshipId]);

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

              <ul className="hidden lg:flex space-x-6" style={{ color: "#003a65" }}>
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

            <ul
              className="lg:hidden flex-col space-y-6 items-center bg-white absolute top-0 right-0 w-full h-screen p-6 z-20 transition-transform duration-300 transform translate-x-full animate-pulse"
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
        <img src='/Empty.gif' />

      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="flex justify-center mb-8">
          <RepeatParagraph>
            <h3 className="text-center text-3xl sm:text-5xl md:text-5xl  text-[#b92a3b] ">
              {scholarship.title}
            </h3>
            <p className="text-center text-3xl sm:text-5xl md:text-2xl  text-[#b92a3b]">
              {scholarship.universityId.name}
            </p>
          </RepeatParagraph>
        </div>

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
    </div>
  );
}
