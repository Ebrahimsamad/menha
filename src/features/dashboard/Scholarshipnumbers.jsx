import React, { useEffect, useState } from 'react';
import { FaUniversity, FaUserGraduate, FaHandHoldingUsd, FaBriefcase } from 'react-icons/fa';
import RepeatParagraph from "../../ui/RepeatParagrah";
import { impact } from '../../services/ImpactMen7a';

export default function ScholarshipNumbers() {
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incrementCount = (start, end, setCount) => {
      if (start < end) {
        const increment = Math.ceil((end - start) / 50); 
        const interval = setInterval(() => {
          setCount(prevCount => {
            const nextCount = prevCount + increment;
            if (nextCount >= end) {
              clearInterval(interval);
              return end;
            }
            return nextCount;
          });
        }, 50); 
      } else {
        setCount(end);
      }
    };

    const getImpact = async () => {
      try {
        const data = await impact();
        incrementCount(0, data.totalUniversities, setTotalUniversities);
        incrementCount(0, data.totalUsers, setTotalUsers);
        incrementCount(0, data.totalScholarships, setTotalScholarships);
      } catch (error) {
        console.log(`Error loading data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getImpact();
  }, []);

  return (
    <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-opacity-75"></div>
        </div>
      ) : (
        <>
          <RepeatParagraph>
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-10">Men7a's impact on society</h2>
          </RepeatParagraph>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
            <div className="flex flex-col items-center text-center">
              <FaUniversity className="text-4xl sm:text-5xl text-red-600 mb-2" />
              <h3 className="text-3xl sm:text-4xl text-red-600 font-bold mb-3">{totalUniversities}</h3>
              <p className="mt-2 sm:mt-4 text-[#002b4c] max-w-xs font-bold text-2xl">Partner Universities</p>
              <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
                Menha currently has partnerships with numerous universities, expanding its reach within the academic community.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
            <FaBriefcase className="text-4xl sm:text-5xl text-red-600 mb-2" /> 
              <h3 className="text-3xl sm:text-4xl text-red-600 font-bold mb-3">{totalScholarships}</h3>
              <p className="mt-2 sm:mt-4 text-[#002b4c] max-w-xs font-bold text-2xl">Available Scholarships</p>
              <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
                Menha provides a wide range of scholarships, creating opportunities and fostering connections across diverse fields and regions worldwide.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaUserGraduate className="text-4xl sm:text-5xl text-red-600 mb-2" />
              <h3 className="text-3xl sm:text-4xl text-red-600 font-bold mb-3">{totalUsers}</h3>
              <p className="mt-2 sm:mt-4 text-[#002b4c] max-w-xs font-bold text-2xl">Active Users</p>
              <p className="mt-2 sm:mt-4 text-gray-600 max-w-xs">
                Menha has a growing community of users, fostering connections and collaboration across various sectors and regions globally.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
