/* eslint-disable react/prop-types */
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutUniversity({ scholarship }) {
  if (!scholarship) {
    return <p>No scholarship details available.</p>;
  }

  return (
    <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">

        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">
                University address
              </td>
              <td className="primary-text border px-4 py-2">
                {scholarship.universityId.address}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">
                University Name
              </td>
              <td className="primary-text border px-4 py-5">
                {scholarship.universityId.name}
              </td>
            </tr>

            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Faculty Name</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.universityId.faculityName}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">
                University Email
              </td>
              <td className="primary-text border px-4 py-5">
                <a
                  href={`mailto:${scholarship.universityId.email}`}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  {scholarship.universityId.email}
                </a>
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Country</td>
              <td className="primary-text border px-4 py-5">
                {scholarship.country}
              </td>
            </tr>
            <tr className="table-row">
              <td className="secondary-text border px-4 py-5">Page Url</td>
              <td className="primary-text border px-4 py-5">
                <a href={scholarship.universityId.pageUrl} target="_blank" className="text-blue-500 underline">{scholarship.universityId.pageUrl}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="primary-text text-2xl font-semibold mb-4">Contact</h3>
        <div className="space-y-4">
          <p className="primary-text">{scholarship.universityId.name}</p>
          <p className="primary-text">{scholarship.universityId.facultyName}</p>
          <p className="primary-text">{scholarship.universityId.address}</p>
          <p className="primary-text">
            <a
              href={`mailto:${scholarship.universityId.email}`}
              className="text-blue-500 underline"
              target="_blank"
            >
              Email
            </a>
          </p>
          <p className="primary-text">
            <a
              href={`tel:+${scholarship.universityId.phone}`}
              className="text-blue-500 underline"
              target="_blank"
            >
              {scholarship.universityId.phone}
            </a>
          </p>

          <div className="primary-text flex space-x-6">
            <a
              href="https://www.facebook.com/ebrahim7asn"
              className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://github.com/Ebrahimsamad"
              className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
              aria-label="GitHub"
              target="_blank"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ebrahim7asn"
              className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <img
            src={scholarship.universityId.image}
            alt={scholarship.universityId.name}
            className="rounded-lg shadow-lg"
          />
          <p className="mt-2 text-sm text-center text-gray-500">
            {scholarship.universityId.name}
          </p>
        </div>
      </div>
    </div>
  );
}
