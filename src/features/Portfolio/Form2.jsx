/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Form2({ onSubmitSuccess,modeOfStudy,courseLanguage }) {
  const [loading, setLoading] = useState(false);
  const [, setSelectedLanguageData] = useState(null);
  const navigate = useNavigate();
  const editMode = localStorage.getItem("editMode");
  const idParam = localStorage.getItem("id");

  console.log('editMode in form2:', editMode);
  console.log('id: in form2', idParam);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("form2Data");
    if (savedData) {
      const formData = JSON.parse(savedData);
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key], { shouldValidate: true });
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("form2Data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.language) {
        const selectedLanguage = courseLanguage.find((lang) => lang._id === value.language);
        setSelectedLanguageData(selectedLanguage);
        if (selectedLanguage) {
          setValue("courses", selectedLanguage.course.join(", "));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [courseLanguage, setValue, watch]);

  const onSubmit = async (data) => {

    const transformedData = {
      ...data,
      isWinter: data.beginning === "Winter" ? true : false, 
      isFree: data.funding === "Free" ? true : false,       
      isFullTime: data.studyType === "Full-Time" ? true : false, 
    };
    delete transformedData.funding;
    delete transformedData.beginning;
    delete transformedData.studyType;
  
    onSubmitSuccess(transformedData);

    try {
      setLoading(true);
      console.log("Form Data:",transformedData);

      // toast.success("form2 submitted successfully!");
      // navigate("/portfolio/submitted");
    } catch (error) {
      console.error("Error:", error);

      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
          <form className="space-y-6">
            <div className="animate-pulse">
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-1/2 rounded mb-4"></div>
              </div>
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-3/4 rounded mb-4"></div>
              </div>
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-full rounded mb-4"></div>
              </div>
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-1/2 rounded mb-4"></div>
              </div>
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-1/2 rounded mb-4"></div>
              </div>
              <div className="flex items-center">
                <div className="h-6 bg-gray-300 w-1/2 rounded mb-4"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Country
            </label>
            {errors.country ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            type="text"
            {...register("country", {
              required: "Country is required",
              minLength: {
                value: 3,
                message: "Country must be at least 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Country must only contain letters and spaces",
              },
              validate: {
                startsWithCapital: (value) =>
                  /^[A-Z]/.test(value) ||
                  "Title must start with a capital letter",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            placeholder="Enter your country"
          />
          {errors.country && (
            <p className="text-red-600">{errors.country.message}</p>
          )} */}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Mode of Study
            </label>
            {errors.modeOfStudy ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("modeOfStudy", {
              required: "Mode of Study is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          > <option value="">Select Mode of Study</option>
          {modeOfStudy.map((mode) => (
            <option key={mode._id} value={mode._id}>
              {mode.modeOfStudy}
            </option>
          ))}
          </select>
          {errors.modeOfStudy && (
            <p className="text-red-600">{errors.modeOfStudy.message}</p>
          )}



<div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">Language</label>
            {errors.language ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("language", { required: "Language is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select a language</option>
            {courseLanguage.map((lang) => (
              <option key={lang._id} value={lang._id}>
                {lang.name}
              </option>
            ))}
          </select>
          {errors.language && <p className="text-red-600">{errors.language.message}</p>}

          {/* Courses */}
          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">Courses</label>
          </div>
          <input
            type="text"
            {...register("courses", { required: "Courses are required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            placeholder="Available courses"
            disabled={true}
          />
          {errors.courses && <p className="text-red-600">{errors.courses.message}</p>}





          {/* Beginning (Season) */}
          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Beginning
            </label>
            {errors.beginning ? (
              <FaExclamationCircle className="text-red-600"/>
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("beginning", {
              required: "Beginning season is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
          </select>
          {errors.beginning && (
            <p className="text-red-600">{errors.beginning.message}</p>
          )}

          {/* Funding */}
          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Funding
            </label>
            {errors.funding ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("funding", { required: "Funding status is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="Free">Free</option>
            <option value="Not-Free">Not-Free</option>
          </select>
          {errors.funding && (
            <p className="text-red-600">{errors.funding.message}</p>
          )}

          {/* Full-Time/Part-Time */}
          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Full-Time/Part-Time
            </label>
            {errors.studyType ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("studyType", {
              required: "Full-Time/Part-Time is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
          {errors.studyType && (
            <p className="text-red-600">{errors.studyType.message}</p>
          )}

{editMode ? (
        <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-3  text-white rounded-lg ${
          isValid
            ? "bg-[#003a65] hover:bg-[#002a4b]"
            : "bg-blue-600 hover:bg-blue-700"
        } disabled:bg-gray-400 focus:outline-none`}
      >
        {loading ? "editting..." : "Edit"}
      </button>

) : (
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3  text-white rounded-lg ${
              isValid
                ? "bg-[#003a65] hover:bg-[#002a4b]"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:bg-gray-400 focus:outline-none`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          )}
        </form>
      </div>
    </div>
  );
}
