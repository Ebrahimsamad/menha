import React, { useState, useEffect, useContext } from "react";
import { fetchSavedScholarships,toggle } from "../../services/SavedScholarship";
import PrimaryButton from '../../ui/PrimaryButton';
import RepeatParagrah from "../../ui/RepeatPara";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import SecondaryButton from "../../ui/SecondaryButton";


const SkeletonCard = () => (
  <div className="block rounded-lg bg-white shadow-lg animate-pulse">
    <div className="rounded-t-lg w-full h-48 bg-gray-300" />
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-5/6" />
        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3" />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          className="inline-block rounded px-4 py-2 text-xs font-medium leading-normal bg-gray-500 text-white"
        >
          Loading...
        </button>
      </div>
    </div>
  </div>
);

const SavedScholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 3; 
  const [isRemoved, setIsRemoved] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedScholarships, setSavedScholarships] = useState(new Set());
  const [saveLoadingId, setSaveLoadingId] = useState('');
  const { sevedScholarship,setSevedScholarship}=useContext(UserContext)

  useEffect(() => {
    setIsRemoved(false)
    const getScholarships = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSavedScholarships(currentPage, scholarshipsPerPage);
        setScholarships(data.scholarships);
        setTotalPages(data.pagination.totalPages);
        const initialSaved = new Set(data.scholarships.map((scholarship) => scholarship._id));
        setSavedScholarships(initialSaved);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        setError("Failed to fetch scholarships. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getScholarships();
  }, [currentPage,isRemoved]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSaveScholarship = async (id) => {
    // setSavedScholarships((prev) => {
    //   const updated = new Set(prev);
    //   updated.has(id) ? updated.delete(id) : updated.add(id);
    //   return updated;
    // });

    // if (savedScholarships.has(id)) {
    //   setScholarships((prevScholarships) =>
    //     prevScholarships.filter((scholarship) => scholarship._id !== id)
    //   );

      try {
        setSaveLoadingId(id);
      let newSaved= toggle(id)
      toast.promise(newSaved, {
        loading: "unsaving...",
        success: "unsaved successfully!",
        error: "try again"
      })
      const saved=await newSaved
      localStorage.setItem('savedScholarships', JSON.stringify(saved.savedScholarshipIds));
      setSevedScholarship(saved.savedScholarshipIds)
        setIsRemoved(true)
      } catch (error) {
        console.error(`Failed to remove scholarship ${id}:`, error.message);
        // setSavedScholarships((prev) => {
        //   const reverted = new Set(prev);
        //   reverted.add(id);
        //   return reverted;
        // });
        // setError("Failed to remove the scholarship. Please try again.");
      }
    // } 
  };

  return (
    <div className="p-6 container mx-auto mb-5">
      
          <RepeatParagrah>

          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-5">
          Saved Scholarships
          </h1>
          </RepeatParagrah>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Array.from({ length: scholarshipsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <h2 className="text-xl font-bold mb-5">No saved scholarships found</h2>
          <img src='/Empty.gif' />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((scholarship) => (
              <div key={scholarship._id} className="block rounded-lg bg-white shadow-lg">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={scholarship.universityId.image || 'https://via.placeholder.com/400x200'}
                  alt={scholarship.title || "Scholarship Image"}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-xl font-medium leading-tight">
                      {scholarship.title || "No Title Available"}
                    </h5>
                    {(saveLoadingId===scholarship._id?(<Spinner color="red-500" />):(<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={savedScholarships.has(scholarship._id) ? '#003a65' : 'none'}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 cursor-pointer transition duration-150 ease-in-out
                        ${savedScholarships.has(scholarship._id) ? 'text-[#003a65]' : 'hover:text-blue-500'}`}
                      onClick={() => handleSaveScholarship(scholarship._id)}
                      aria-label={savedScholarships.has(scholarship._id) ? 'Unsave Scholarship' : 'Save Scholarship'}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>))}
                  </div>

                  <p className="mb-4 text-base">
                    <strong>Field of Study:</strong> {scholarship.fieldOfStudyId.fieldOfStudy} <br />
                    <strong>Course Type:</strong> {scholarship.courseTypeId.courseType} <br />
                    <strong>Duration:</strong> {scholarship.duration} <br />
                    <strong>Mode of Study:</strong> {scholarship.modeOfStudyId.modeOfStudy} <br />
                    <strong>Country:</strong> {scholarship.country} <br />
                    <strong>University:</strong> {scholarship.universityId.name} <br />
                    <strong>Faculty:</strong> {scholarship.universityId.faculityName}
                  </p>
                  <div className="flex space-x-2">
                    <PrimaryButton
                      type="button"
                      onClick={() => window.location.href = `/scolarshipdetails/${scholarship._id}`}
                      className="inline-block rounded px-4 py-2 text-xs font-medium leading-normal bg-gray-500 text-white transition duration-150 ease-in-out"
                    >
                      Details
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="flex justify-between items-center mt-6">
              <div className={`${currentPage === 1 ? 'hidden' : ''}`}>

                <SecondaryButton onClick={handlePrevPage} >Previous</SecondaryButton>
              </div>
              <button className={`bg-gray-500 ${currentPage === 1 ? '' : 'hidden'} text-white font-bold py-2 px-4 rounded-full transition duration-300 `}>
                Previous
              </button>

              <span className="mx-2">Page {currentPage} of {totalPages}</span>
              <div className={` ${currentPage === totalPages ? 'hidden' : ''}`}>

                <PrimaryButton onClick={handleNextPage} >Next</PrimaryButton>
              </div>
              <button className={`bg-gray-500 ${currentPage === totalPages ? '' : 'hidden'} text-white font-bold py-2 px-4 rounded-full transition duration-300 `}>
                Next
              </button>
            </div>
        </>
      )}
    </div>
  );
};

export default SavedScholarships;
