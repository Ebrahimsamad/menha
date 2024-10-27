import React, { useEffect, useState } from "react";
import RepeatParagrah from "../../ui/RepeatPara";
import { HiXCircle } from "react-icons/hi";
import { MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import {
  deleteUserPortfolio,
  getUserPortfolio,
} from "../../services/Portfolio";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import PrimaryButton from "../../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function Portfolio({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userProfile = async () => {
      try {
        const data = await getUserPortfolio();
        const portfolioData = data.portfolio[0];
        setPortfolio(portfolioData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      }
    };
    userProfile();
  }, []);

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage("");
  };
  const handleDeletePortfolio = async (id) => {
    setDeleteLoading(true);
    try {
      const data = deleteUserPortfolio(id);
      toast.promise(data, {
        loading: "deleteing...",
        success: "deleted successfully!",
        error: "try again",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPortfolio(null)
      setDeleteLoading(false);
    }
  };
  const handleEditPortfolio = (portfolio) => {
    let gpa = "";
    let gpaOption = "";
    if (Number.isInteger(portfolio.gpa)) {
      gpa += portfolio.gpa;
    } else {
      gpaOption += portfolio.gpa;
    }
    const form1Data = {
      levelOfStudy: portfolio.levelOfStudy,
      phone: portfolio.phone,
      gpa,
      gpaOption,
      fieldOfStudy: portfolio.fieldOfStudyId._id,
      courseType: portfolio.courseTypeId._id,
      gender: portfolio.gender,
      dateOfBirth: portfolio.dateOfBirth,
      militaryStatusImageUrl: portfolio.militaryStatusImage,
      graduationImageUrl: portfolio.graduationImage,
      IDImageUrl: portfolio.IDImage,
    };
    let begining;
    if (portfolio.isWinter) {
      begining = "Winter";
    } else {
      begining = "Summer";
    }
    let funding;
    if (portfolio.isFree) {
      funding = "Free";
    } else {
      funding = "Not-Free";
    }
    let studyType;
    if (portfolio.isFullTime) {
      studyType = "Full-Time";
    } else {
      studyType = "Part-Time";
    }
    const form2Data = {
      begining: begining,
      funding: funding,
      language: portfolio.languageId._id,
      modeOfStudy: portfolio.modeOfStudyId._id,
      studyType: studyType,
    };

    localStorage.setItem("form1Data", JSON.stringify(form1Data));
    localStorage.setItem("form2Data", JSON.stringify(form2Data));

    navigate(`/portfolio/form1?editMode=true&id=${portfolio._id}`);
  };

  const currentDate = new Date();
  const userBuydate = new Date(user.expBuyPortfolio).toISOString();

  if (!user.isBuyPortfolio || userBuydate < currentDate) {
    return (
      <>
        <div className="border rounded-lg shadow-lg bg-gradient-to-r from-white to-[#e9e9e9] p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#003a65] me-3">
                {!user.isBuyPortfolio ? "Buy Portfolio" : "Upgrade Your Plan"}
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center my-5">
            <h2 className="font-bold text-xl mb-10 mt-5 text-center text-[#8A690F]">
              {user.isBuyPortfolio
                ? "Your subscription has ended, Renew now to continue enjoying the benefits!"
                : "Create portfolio now to  enjoying the benefits!"}
            </h2>
            <PrimaryButton onClick={() => navigate("/pricing")}>
              {!user.isBuyPortfolio ? "Buy Portfolio" : "Upgrade Plan"}
            </PrimaryButton>
          </div>
        </div>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <div className="border rounded-lg shadow-lg bg-white p-6">
          <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3 mb-5">
            <div className="flex items-center">
              <div className="h-8 w-36 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-6 w-20 bg-gray-300 animate-pulse rounded-md ml-3"></div>
            </div>
            <div className="flex">
              <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full ml-2"></div>
            </div>
          </div>
          <div className="h-8 w-48 bg-gray-300 animate-pulse rounded-md mb-2"></div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="text-gray-500">
                <div className="h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
          <div className="h-8 w-48 bg-gray-300 animate-pulse rounded-md my-2"></div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="text-gray-500">
                <div className="h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!portfolio) {
    return (
      <>
        <div className="border rounded-lg shadow-lg bg-gradient-to-r from-white to-[#e9e9e9] p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#003a65] me-3">
                Add Portfolio
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center my-5">
            <h2 className="font-bold text-xl mb-10 mt-5 text-center text-[#8A690F]">
              Create your portfolio, and enjoy a wide range of benefits with
              ease!
            </h2>
            <PrimaryButton onClick={() => navigate("/portfolio/form1")}>
              Add Portfolio
            </PrimaryButton>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border rounded-lg shadow-lg bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-[#003a65] pb-3 mb-5">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-[#003a65] me-3">
              Portfolio
            </h2>
            {/* Conditional rendering based on isAccept and isReject */}
            {portfolio.isAccept && (
              <div className="text-green-400 text-xl flex items-center">
                <FaCheckCircle />
                <p className="text-gray-400 text-lg hidden lg:block ms-3">
                  {" "}
                  - Your Portfolio Accepted
                </p>
              </div>
            )}
            {portfolio.isReject && (
              <div className="text-red-500 text-xl flex items-center">
                <HiXCircle />
                <p className="text-gray-400 text-lg ms-3 hidden lg:block ">
                  {" "}
                  - Your Portfolio Rejected Check Your Email
                </p>
              </div>
            )}
            {!portfolio.isAccept && !portfolio.isReject && (
              <div className="text-yellow-400 text-xl flex items-center">
                <MdPending />
                <p className="text-gray-400 text-lg ms-3 hidden lg:block ">
                  {" "}
                  - Your Portfolio is Under Review
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              className="p-2 rounded-full hover:bg-white focus:outline-none transition-colors duration-200"
              onClick={() => handleEditPortfolio(portfolio)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-[#003a65]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            {deleteLoading ? (
              <button className="cursor-default ">
                <Spinner color="red-500" />
              </button>
            ) : (
              <button
                className="p-2 rounded-full hover:bg-white focus:outline-none transition-colors duration-200"
                onClick={() => handleDeletePortfolio(portfolio._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <RepeatParagrah>
          <h3 className="mb-2 text-3xl">Scholarship Information:</h3>
        </RepeatParagrah>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Field of Study:</strong>{" "}
            {portfolio.fieldOfStudyId.fieldOfStudy}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Course Type:</strong>{" "}
            {portfolio.courseTypeId.courseType}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Mode of Study:</strong>{" "}
            {portfolio.modeOfStudyId.modeOfStudy}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Beginning:</strong>{" "}
            {portfolio.isWinter ? "Winter" : "Summer"}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Free/Not Free:</strong>{" "}
            {portfolio.isFree ? "Free" : "Not Free"}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Full Time/Part Time:</strong>{" "}
            {portfolio.isFullTime ? "Full Time" : "Part Time"}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">GPA:</strong> {portfolio.gpa}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Language:</strong>{" "}
            {portfolio.languageId.name}
          </div>
        </div>

        <RepeatParagrah>
          <h3 className="my-2 text-3xl"> Personal Information:</h3>
        </RepeatParagrah>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Level of Study:</strong>{" "}
            {portfolio.levelOfStudy}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Phone:</strong> {portfolio.phone}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Gender:</strong>{" "}
            {portfolio.gender}
          </div>
          <div className="text-gray-500">
            <strong className="text-[#003a65]">Age:</strong> {portfolio.age}
          </div>
          <div>
            <strong className="text-[#003a65] me-2">
              Military Status Image:
            </strong>
            <button
              className="text-[#8A690F] underline"
              onClick={() => openModal(portfolio.militaryStatusImage)}
            >
              View Image
            </button>
          </div>
          <div>
            <strong className="text-[#003a65] me-2">ID Image:</strong>
            <button
              className="text-[#8A690F] underline"
              onClick={() => openModal(portfolio.IDImage)}
            >
              View Image
            </button>
          </div>
          <div>
            <strong className="text-[#003a65] me-2">Graduation Image:</strong>
            <button
              className="text-[#8A690F] underline"
              onClick={() => openModal(portfolio.graduationImage)}
            >
              View Image
            </button>
          </div>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={currentImage}
                alt="View"
                className="max-w-full max-h-[80vh]"
              />
              <button className="mt-4 text-red-500" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
