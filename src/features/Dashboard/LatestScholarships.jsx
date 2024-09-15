import { useState, useEffect } from "react";
import RepeatParagraph from "../../ui/RepeatPara";
import PrimaryButton from "../../ui/PrimaryButton";
import { fetchScholarships } from "../../services/LatestScholarships";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../ui/Spinner";

export default function LatestScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

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

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <>
        <div className="flex justify-center mb-8">
          <RepeatParagraph>
            <h2 className="text-6xl text-center">Latest Scholarships</h2>
          </RepeatParagraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <>
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-2">
                {scholarships.length > 0 ? (
                  <>
                    <img
                      src={scholarships[0]?.universityId?.image}
                      alt={scholarships[0]?.title}
                      className="w-full h-auto rounded-lg"
                    />
                    <h3
                      className="text-2xl font-bold mt-6"
                      style={{ color: "#003a65" }}
                    >
                      {scholarships[0]?.title}
                    </h3>
                    <p className="mt-4" style={{ color: "#003a65" }}>
                      {scholarships[0]?.description}
                    </p>
                  </>
                ) : (
                  <p>No scholarships available.</p>
                )}
              </div>

              <div className="space-y-8">
                {scholarships.slice(1, 3).map((scholarship) => (
                  <div key={scholarship._id}>
                    <img
                      src={scholarship?.universityId?.image}
                      alt={scholarship?.title}
                      className="w-full h-auto rounded-lg"
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
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <PrimaryButton>VIEW SCHOLARSHIPS</PrimaryButton>
        </div>

        <Toaster />
      </>
    </section>
  );
}


