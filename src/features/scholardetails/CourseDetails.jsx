/* eslint-disable react/prop-types */
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Toaster } from "react-hot-toast";

export default function CourseDetails({ scholarship }) {

  const durationYears = parseInt(scholarship.duration);
  const totalSemesters = durationYears * 2;

  return (
    <div className="container mx-auto py-6 ">
      <Toaster />
      <style>
        {`
          .table-row:nth-child(odd) {
            background-color: #f9f9f9; 
          }
          .table-row:nth-child(even) {
            background-color: #e9e9e9; 
          }
          .primary-text {
            color: #003a65; 
          }
          .secondary-text {
            color: #8A690F;  
            font-weight: bold;  
          }
        `}
      </style>

      <div className=" bg-white shadow-lg rounded-lg p-6">

        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Field Of Study</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.fieldOfStudyId.fieldOfStudy}
              </td>
            </tr>

            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Course Type</td>
              <td className="primary-text border px-4 py-2">
                {scholarship.courseTypeId.courseType}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Funding opportunities within the university</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isFree ? "YES" : "NOT Free"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Description</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.description}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Beginning</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isWinter ? "Winter" : "Summer"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Programme duration</td>
              <td className="primary-text border px-4 py-5">
                {totalSemesters} semesters
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Full-time / part-time</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isFullTime ? "Full Time" : "Part Time"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">GPA</td>
              <td className="primary-text border px-4 py-5">{scholarship.gpa}</td>
            </tr>

            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Country</td>
              <td className="primary-text border px-4 py-5">{scholarship.country}</td>
            </tr>
          </tbody>
        </table>
      </div>

     
    </div>
  );
}
