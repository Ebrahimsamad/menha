import React, { useState, useEffect, useContext } from 'react';
import RepeatParagraph from '../../ui/RepeatPara';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../ui/PrimaryButton';
import SecondaryButton from '../../ui/SecondaryButton';
import { getAllScholarships } from '../../services/Scholarship';
import { UserContext } from '../../context/UserContext';
import { getSaveScholarship, toggle } from '../../services/savedScholarship';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const CardScholarship = ({ isOpen }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoadingId, setSaveLoadingId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedScholarships, setSavedScholarships] = useState(new Set());
  const [error, setError] = useState('')
  const location = useLocation();
  const params = new URLSearchParams();
  const navigate = useNavigate();
  const { sevedScholarship,setSevedScholarship}=useContext(UserContext)
  const { isAuthenticated} = useAuth();


  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);

      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('courseTypeId')) params.append('courseTypeId', searchParams.get('courseTypeId'));
      if (searchParams.get('languageId')) params.append('languageId', searchParams.get('languageId'));
      if (searchParams.get('fieldOfStudy')) params.append('fieldOfStudyId', searchParams.get('fieldOfStudy'));
      if (searchParams.get('modeOfStudyId')) params.append('modeOfStudyId', searchParams.get('modeOfStudyId'));
      if (searchParams.get('universityId')) params.append('universityId', searchParams.get('universityId'));
      if (searchParams.get('isWinter')) params.append('isWinter', searchParams.get('isWinter') === 'true');
      if (searchParams.get('isFree')) params.append('isFree', searchParams.get('isFree') === 'true');
      if (searchParams.get('isFullTime')) params.append('isFullTime', searchParams.get('isFullTime') === 'true');
      if (searchParams.get('page')) params.append('page', searchParams.get('page'));
      setCurrentPage(parseInt(searchParams.get('page')) || 1)
      params.append('size', 2);

      try {

        const data = await getAllScholarships(params.toString())

        setScholarships(data.scholarships);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('Error fetching scholarships. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [location]);

  useEffect(() => {
    setSavedScholarships(new Set(sevedScholarship));
  }, []);

  const handleSaveScholarship = async(id) => {
    try {
      if(!isAuthenticated)return toast.error("sorry, login first")
      setSaveLoadingId(id);
      let newSaved= toggle(id)
      toast.promise(newSaved, {
        loading: "saving...",
        success: "saved successfully!",
        error: "try again"
      })
      const saved=await newSaved
      console.log(saved.savedScholarshipIds)
      setSavedScholarships(new Set( saved.savedScholarshipIds));
      localStorage.setItem('savedScholarships', JSON.stringify(saved.savedScholarshipIds));
     setSevedScholarship(saved.savedScholarshipIds)
    } catch (error) {
      console.log(error)
    }finally{
      setSaveLoadingId('')
    }
   
  };

  const handlePageChange = (direction) => {
    const searchParams = new URLSearchParams(location.search);
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      searchParams.set('page', currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      searchParams.set('page', currentPage - 1);


    }
    navigate(`/scholarships?${searchParams.toString()}`);

  };
  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Something went wrong, but every setback is a setup for a comeback. Please try again</h2>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col w-full  space-y-5 pb-5">
            {[1, 2, 3].map((i) => (
              <div className="card  w-full mx-auto lg:w-3/4 bg-white shadow-lg p-5 m-2 animate-pulse" key={i}>
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-6"></div>
                  </div>
                  <hr />
                  <div className="flex flex-col md:flex-row justify-between items-start mt-4 gap-4">
                    <div className="w-full md:w-1/2">
                      <div className="flex flex-wrap">
                        {[...Array(6)].map((_, index) => (
                          <div key={index} className="w-full md:w-1/2 mt-8">
                            <div className="h-4 bg-gray-300 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-5 md:mt-0">
                      <div className="h-48 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : scholarships.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-5">No scholarships found</h2>
          <img src='/Empty.gif' />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full space-y-5 ">
            {scholarships.map((scholarship) => (

              <div key={scholarship._id} className="card  w-full mx-auto lg:w-3/4 shadow-md p-5 m-2 bg-white hover:scale-105">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <Link to={`/scolarshipdetails/${scholarship._id}`}>

                      <RepeatParagraph>
                        <h2 className="text-4xl text-[#B92A3B]">{scholarship.title}</h2>
                      </RepeatParagraph>
                    </Link>
                    {(saveLoadingId===scholarship._id?(<Spinner color="red-500" />):(

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={savedScholarships.has(scholarship._id) ? '#003a65' : 'none'}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 cursor-pointer ${savedScholarships.has(scholarship._id) ? 'text-[#003a65]' : ''} `}
                      onClick={() => handleSaveScholarship(scholarship._id)}
                      disabled={saveLoadingId}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    )

                    )}
                  </div>
                  <hr />
                  <Link to={`/scolarshipdetails/${scholarship._id}`}>

                    <div className={`flex flex-col md:flex-row justify-between items-start mt-4 gap-4`}>
                      <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}`}>
                        <div className="flex flex-wrap">
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Field of Study:</strong> {scholarship.fieldOfStudyId.fieldOfStudy}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Course Type:</strong> {scholarship.courseTypeId.courseType}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Duration:</strong> {scholarship.duration}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Mode of Study:</strong> {scholarship.modeOfStudyId.modeOfStudy}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Country:</strong> {scholarship.country}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">University:</strong> {scholarship.universityId.name}</p>
                          </div>
                          <div className={`w-full ${!isOpen ? 'md:w-1/2' : ''}  mt-8`}>
                            <p><strong className="text-[#8A690F]">Faculty:</strong> {scholarship.universityId.faculityName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 mt-5 md:mt-0">
                        <img src={scholarship.universityId.image} alt="University" className="w-full h-80 rounded-lg shadow-lg" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            <div className="flex justify-around py-10">
              <div className={`${currentPage === 1 ? 'hidden' : ''}`}>

                <SecondaryButton onClick={() => handlePageChange('prev')} >Previous</SecondaryButton>
              </div>
              <button className={`bg-gray-500 ${currentPage === 1 ? '' : 'hidden'} text-white font-bold py-2 px-4 rounded-full transition duration-300 `}>
                Previous
              </button>

              <span className="mx-2">Page {currentPage} of {totalPages}</span>
              <div className={` ${currentPage === totalPages ? 'hidden' : ''}`}>

                <PrimaryButton onClick={() => handlePageChange('next')} >Next</PrimaryButton>
              </div>
              <button className={`bg-gray-500 ${currentPage === totalPages ? '' : 'hidden'} text-white font-bold py-2 px-4 rounded-full transition duration-300 `}>
                Next
              </button>
            </div>
          </div>

        </>
      )}
    </>
  );
};

export default CardScholarship;
