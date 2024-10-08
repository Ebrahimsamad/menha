import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlueButton from "../../ui/BlueButton";

import { Link } from "react-router-dom";
import { useState } from "react";
import { contact } from "../../services/ContactUs";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const teamMembers = [
    {
      name: "EBRAHIM SAMAD",
      role: "CEO & Owner",
      img: "/samad.jpeg",
    },
    {
      name: "MOHAMED HESHAM",
      role: "Junior Software Engineer",
      img: "/hesham.jpeg",
    },
    {
      name: "AMR KATARIA",
      role: "Junior Software Engineer",
      img: "/amr.jpg",
    },
    {
      name: "FATMA YOUSSEF",
      role: "Junior Software Engineer",
      img: "/fatma.jpeg",
    },
    {
      name: "HOSSAM SALAH",
      role: "Junior Software Engineer",
      img: "/hossam.jpeg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleContactUs = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await toast.promise(
          contact(formData),
          {
            loading: "Sending...",
            success: "Email sent successfully",
            error: (error) => `Error: ${error.message}`,
          }
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        })
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <div className="bg-white mt-5">
      <div className="container mx-auto">
        {/* About Us */}
        <div className="text-center mb-12">
          <h1 className="text-[60px] leading-snug font-brush text-[#b92a3b]">
            About Men7a
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            We provide the best scholarship opportunities for students globally.
          </p>
        </div>

        {/* Meet Our Team Section */}
        <div className="text-center mb-16">
          <h3 className="text-[40px] leading-snug font-brush mb-8 text-[#003a65]">
            Meet Our Team
          </h3>
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4">
                <div className="bg-white border border-[#003a65] p-6 shadow-lg text-center hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-[#003a65] mb-2">
                    {member.name}
                  </h4>
                  <p className="text-lg text-[#003a65]">{member.role}</p>
                  <div className="flex justify-center mt-4 space-x-4 text-[#b92a3b]">
                    <a href="#" className="hover:text-[#003a65]">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="hover:text-[#003a65]">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="hover:text-[#003a65]">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Scholarships Section */}
        <div className="bg-white py-16 text-center">
          <h2 className="text-[60px] leading-snug font-brush text-[#b92a3b] mb-8">
            Scholarship Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Men7a offers scholarships to help students around the globe pursue
            their dreams. Our platform connects students with scholarships that
            align with their needs and qualifications.
          </p>
            <Link to="/scholarships">
          <BlueButton>
            Explore Scholarships
          </BlueButton>
            </Link>
        </div>

        {/* Contact Us Section */}
        <div className="bg-gray-100 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#003a65] mb-8">Contact Us</h2>
          <form className="max-w-lg mx-auto space-y-4" onSubmit={handleContactUs}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92a3b] transition duration-300`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92a3b] transition duration-300`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b92a3b] transition duration-300`}
                rows="4"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`transition duration-300 bg-[#b92a3b] hover:bg-[#002b4c] text-white font-bold py-2 px-4 rounded-full `}
            >
              {loading ? <Spinner /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
