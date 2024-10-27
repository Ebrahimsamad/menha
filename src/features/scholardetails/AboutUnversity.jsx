/* eslint-disable react/prop-types */

export default function AboutUniversity({ scholarship }) {
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

      
    </div>
  );
}
