import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#003a65] text-white py-8">
      <div className="container lg:ml-36 lg:mr-36 mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/dashboard">
              <img
                src="logo.png"
                alt="Men7a Logo"
                className="w-32 h-12 mb-4 object-contain"
              />
            </Link>
            <p className="text-sm">
              Empowering scholarships and opportunities.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 items-center md:items-start">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <a
              href="/dashboard"
              className="hover:bg-[#b92a3b] hover:text-white px-3 py-2 rounded-md"
            >
              Dashboard
            </a>
            <a
              href="/scholarships"
              className="hover:bg-[#b92a3b] hover:text-white px-3 py-2 rounded-md"
            >
              Featured Scholarships
            </a>
            <a
              href="/browse"
              className="hover:bg-[#b92a3b] hover:text-white px-3 py-2 rounded-md"
            >
              Browse Scholarships
            </a>
            <a
              href="/search"
              className="hover:bg-[#b92a3b] hover:text-white px-3 py-2 rounded-md"
            >
              Search
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h5 className="text-lg font-semibold">Connect with Me</h5>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/ebrahim7asn"
                className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://github.com/Ebrahimsamad"
                className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ebrahim7asn"
                className="hover:bg-white hover:text-[#003a65] p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Men7a. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
