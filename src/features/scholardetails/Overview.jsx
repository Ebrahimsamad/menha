/* eslint-disable react/prop-types */
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Overview({ scholarship }) {
  if (!scholarship) {
    return <p>No scholarship details available.</p>;
  }

  return (
    <div className="container mx-auto py-6 ">
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
              <td className="secondary-text border px-4 py-5">Course Type</td>
              <td className="primary-text border px-4 py-2">
                {scholarship.courseTypeId.courseType}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">
                Teaching language
              </td>
              <td className="primary-text border px-4 py-5">
                {scholarship.languageId.name}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Courses</td>
              <td className="primary-text border px-4 py-5">
                <ul className="list-disc pl-5">
                  {scholarship.languageId.course.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Beginning</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.isWinter ? "Winter" : "Summer"}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Duration</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.duration}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Country</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.country}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">GPA</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.gpa}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Mode Of Study</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.modeOfStudyId.modeOfStudy}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">
                Field Of Study
              </td>
              <td className="primary-text border px-4 py-5">
                {scholarship.fieldOfStudyId.fieldOfStudy}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Description</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      
    </div>
  );
}
