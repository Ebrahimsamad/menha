import { useState, useEffect } from "react";
import RepeatParagraph from "../../ui/RepeatParagrah";
import PrimaryButton from "../../ui/PrimaryButton";
import { fetchScholarships } from "../../services/LatestScholarships";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LatestScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getScholarships = async () => {
      try {
        const data = await fetchScholarships();
        setScholarships(data.scholarships);
      } catch (error) {
        setError(error);
        toast.error(`Error loading data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getScholarships();
  }, []);
  const handelViewScholarships = () => {
    navigate(`/scholarships`);
  };
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <>
        <div className="flex justify-center mb-8">
          <RepeatParagraph>
            <h2 className="text-center text-3xl sm:text-5xl md:text-6xl ">
              Latest Scholarships
            </h2>
          </RepeatParagraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <>
              <div className="md:col-span-2">
                <div className="animate-pulse h-full">
                  <div className="bg-gray-300 w-full h-4/5 rounded-lg"></div>
                  <div className="h-8 bg-[#003a65] rounded mt-6 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 "></div>
                  <div className="h-6 bg-[#003a65] rounded mt-4 w-3/4 "></div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="animate-pulse">
                    <div className="bg-gray-300 w-full h-64 rounded-lg"></div>
                    <div className="h-8 bg-[#003a65] rounded mt-6 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 "></div>
                    <div className="h-6 bg-[#003a65] rounded mt-4 w-3/4 "></div>
                  </div>
                </div>
                <div>
                  <div className="animate-pulse">
                    <div className="bg-gray-300 w-full h-64 rounded-lg"></div>
                    <div className="h-8 bg-[#003a65] rounded mt-6 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 "></div>
                    <div className="h-6 bg-[#003a65] rounded mt-4 w-3/4 "></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-2 hover: transition">
                {scholarships.length > 0 ? (
                  <>
                    <Link to={`/scolarshipdetails/${scholarships[0]?._id}`}>
                      <img
                        src={scholarships[0]?.universityId?.image}
                        alt={scholarships[0]?.title}
                        className="w-full h-[80%] rounded-lg hover:scale-105"
                      />
                      <h3
                        className="font-bold mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                        style={{ color: "#003a65" }}
                      >
                        {scholarships[0]?.title}
                      </h3>
                      <p className="mt-4" style={{ color: "#003a65" }}>
                        {scholarships[0]?.description}
                      </p>
                    </Link>
                  </>
                ) : (
                  <p>No scholarships available.</p>
                )}
              </div>

              <div className="space-y-8">
                {scholarships.slice(1, 3).map((scholarship) => (
                  <div key={scholarship._id}>
                    <Link to={`/scolarshipdetails/${scholarship?._id}`}>
                      <img
                        src={scholarship?.universityId?.image}
                        alt={scholarship?.title}
                        className="w-full h-60 rounded-lg hover:scale-105"
                      />
                      <h3
                        className="text-xl font-bold mt-4"
                        style={{ color: "#003a65" }}
                      >
                        {scholarship?.title}
                      </h3>
                      <p className="mt-2" style={{ color: "#003a65" }}>
                        {scholarship?.description}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <PrimaryButton onClick={handelViewScholarships}>
            VIEW SCHOLARSHIPS
          </PrimaryButton>
        </div>
      </>
    </section>
  );
}
