import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Overview from "./Overview";
import CourseDetails from "./CourseDetails";
import CostsFunding from "./CostsAndFunding";
import Requirements from "./Requirments";
import Services from "./Services";
import AboutUniversity from "./AboutUnversity";
import Navbar from "./ScolarshipsNavbar";
import RepeatParagraph from "../../ui/RepeatParagrah";
import { fetchScholarshipDetails } from "../../services/ScolarshipDetails";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

export default function ScolarshipDetails() {
  const { scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    const getScholarshipDetails = async () => {
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
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!scholarship) {
    return <p>No scholarship details available.</p>;
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
              path="requirements"
              element={<Requirements scholarship={scholarship} />}
            />
            <Route
              path="services"
              element={<Services scholarship={scholarship} />}
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
