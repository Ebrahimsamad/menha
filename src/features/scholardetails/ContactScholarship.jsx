import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactScholarship({scholarship}) {
  return (
    <div>
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
              {scholarship.universityId.email}
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
            className="rounded-lg shadow-lg h-full"
          />
          <p className="mt-2 text-sm text-center text-gray-500">
            {scholarship.universityId.name}
          </p>
        </div>
      </div>
    </div>
  )
}
