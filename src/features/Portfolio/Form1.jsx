/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { addCourseType } from "../../services/CourseType";
import { AddFieldOfStudy } from "../../services/FieldOfStudy";

export default function Form1({
  onSubmitSuccess,
  courseTypes,
  fieldsOfStudy,
  setCourseType,
  setFieldOfStudy,
}) {
  const [loading, setLoading] = useState(false);
  const [showOtherFieldOfStudy, setShowOtherFieldOfStudy] = useState(false);
  const [showOtherCourseType, setShowOtherCourseType] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAddFieldButton, setShowAddFieldButton] = useState(false);
  const [isoption, setIsoption] = useState(true);
  const [isoptionFieldOfStudy, setisoptionFieldOfStudy] = useState(true);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const [courseTypeOther, setCourseTypeOther] = useState("");
  const [fieldOfStudyOther, setfieldOfStudyOther] = useState("");

  const [gpaOther, setGpaOther] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("form1Data");
    if (savedData) {
      const formData = JSON.parse(savedData);
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key], { shouldValidate: true });
      });
    }
  }, [setValue]);
  useEffect(() => {
    if (courseTypes.length > 0) {
      console.log("Updated Course Types:", courseTypes);
    }
  }, [courseTypes]);

  useEffect(() => {
    if (fieldsOfStudy.length > 0) {
      console.log("Updated field of study:", fieldsOfStudy);
    }
  }, [fieldsOfStudy]);

  const saveDataToLocalStorage = () => {
    const currentValues = getValues();
    const dataToSave = {
      ...currentValues,
      militaryStatusImage: selectedImage1,
      IDImage: selectedImage2,
      graduationImage: selectedImage3,
    };
    localStorage.setItem("form1Data", JSON.stringify(dataToSave));
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form1Data");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const militaryStatusImageBase64 = localStorage.getItem(
        "militaryStatusImage"
      );
      if (militaryStatusImageBase64) {
        const militaryStatusImage = base64ToFile(
          militaryStatusImageBase64,
          "military_status_image.png"
        );
        setSelectedImage1(militaryStatusImage);
        setValue("militaryStatusImage", militaryStatusImage);
        console.log("Retrieved Military Status Image:", militaryStatusImage);
      }

   
      const IDImageBase64 = localStorage.getItem("IDImage");
      if (IDImageBase64) {
        const IDImage = base64ToFile(IDImageBase64, "ID_image.png");
        setSelectedImage2(IDImage);
        console.log("Retrieved ID Image:", IDImage);
      }


      const graduationImageBase64 = localStorage.getItem("graduationImage");
      if (graduationImageBase64) {
        const graduationImage = base64ToFile(
          graduationImageBase64,
          "graduation_image.png"
        );
        setSelectedImage3(graduationImage);
        console.log("Retrieved Graduation Image:", graduationImage);
      }
    }
  }, []);

  const handleImageChange = (event, imageIndex) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageIndex === 1) {
          setSelectedImage1(file);
          localStorage.setItem("militaryStatusImage", reader.result);
        } else if (imageIndex === 2) {
          setSelectedImage2(file);
          localStorage.setItem("IDImage", reader.result);
        } else if (imageIndex === 3) {
          setSelectedImage3(file);
          localStorage.setItem("graduationImage", reader.result);
        }
        saveDataToLocalStorage();
      };
      reader.readAsDataURL(file);
    } else {
      if (imageIndex === 1) setSelectedImage1(null);
      if (imageIndex === 2) setSelectedImage2(null);
      if (imageIndex === 3) setSelectedImage3(null);
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const onSubmit = async (data) => {
    setLoading(true);
     // تحويل الصور إلى Base64
     const militaryStatusImageBase64 = selectedImage1 ? await convertToBase64(selectedImage1) : "";
     const IDImageBase64 = selectedImage2 ? await convertToBase64(selectedImage2) : "";
     const graduationImageBase64 = selectedImage3 ? await convertToBase64(selectedImage3) : "";

    const dataToSubmit = {
      ...data,
      militaryStatusImage: militaryStatusImageBase64,
      IDImage: IDImageBase64,
      graduationImage: graduationImageBase64,
    };

    onSubmitSuccess(dataToSubmit);

    try {
      console.log("Form Data:", data);

      toast.success("Form1 submitted successfully!");

      navigate("/portfolio/form2");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseTypeChange = (event) => {
    const selectedValue = event.target.value;
    setValue("courseType", selectedValue, { shouldValidate: true });

    if (selectedValue === "other") {
      setShowOtherCourseType(true);
      // setValue("courseTypeOther", selectedValue);
    } else {
      setShowOtherCourseType(false);
      setValue("courseTypeOther", "");
    }

    saveDataToLocalStorage();
  };

  const handleAddCourseType = async () => {
    if (courseTypeOther.trim() === "") {
      toast.error("Please enter a valid course type.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      console.log("Adding course type:", { courseType: courseTypeOther });

      const newCourseType = await addCourseType(
        { courseType: courseTypeOther },
        token
      );

      console.log("Newly added course type:", newCourseType);

      setCourseType((prevCourseTypes) => [
        ...prevCourseTypes,
        newCourseType.newCourseType,
      ]);
      setValue("courseType", newCourseType.newCourseType._, {
        shouldValidate: true,
      });

      console.log("Newly added course type:", courseTypes);
      console.log(getValues());
      console.log("Newly added course type:", newCourseType);

      setShowOtherCourseType(false);
      setCourseTypeOther("");
      setShowAddButton(false);
      setIsoption(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          "Failed to add Course Type. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFieldOfStudyChange = (event) => {
    const selectedValue = event.target.value;
    setValue("fieldOfStudy", selectedValue, { shouldValidate: true });
    if (selectedValue === "other") {
      setShowOtherFieldOfStudy(true);
    } else {
      setShowOtherFieldOfStudy(false);
      setValue("fieldOfStudyOther", "");
    }
    saveDataToLocalStorage();
  };

  const handleAddFieldOfStudy = async () => {
    console.log("fieldOfStudyOther:", fieldOfStudyOther);
    if (!fieldOfStudyOther || fieldOfStudyOther.trim() === "") {
      toast.error("Please enter a valid field of study.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      console.log("Adding field of study:", {
        fieldOfStudy: fieldOfStudyOther,
      });
      const newFieldOfStudy = await AddFieldOfStudy(
        { fieldOfStudy: fieldOfStudyOther },
        token
      );

      console.log("Newly added field of study:", newFieldOfStudy);

      setFieldOfStudy((prevFieldOfStudy) => [
        ...prevFieldOfStudy,
        newFieldOfStudy.newFieldOfStudy,
      ]);
      setValue("FieldOfStudy", newFieldOfStudy.newFieldOfStudy._id, {
        shouldValidate: true,
      });

      console.log("Newly added Field of study:", fieldsOfStudy);
      console.log(getValues());

      console.log("Newly added course type:", newFieldOfStudy);

      setShowOtherFieldOfStudy(false);
      setfieldOfStudyOther("");
      setShowAddFieldButton(false);
      setisoptionFieldOfStudy(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          "Failed to add field of study. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentValues = getValues();
    if (currentValues.courseType) {
      saveDataToLocalStorage();
    }
  }, [getValues, setValue]);

  const handleGpaChange = (event) => {
    const selectedValue = event.target.value;
    setValue("gpaOption", selectedValue, { shouldValidate: true });

    if (selectedValue === "other") {
      setGpaOther(true);
    } else {
      setGpaOther(false);
      setValue("gpa", "");
    }

    saveDataToLocalStorage();
  };
  console.log("Selected Image 3:", selectedImage3);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Level of Study
            </label>
            {errors.levelOfStudy ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("levelOfStudy", {
              required: "Level of Study is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select Level of Study</option>
            <option value="Student">Student</option>
            <option value="Graduated">Graduated</option>
            <option value="Education Professional">Education Professional</option>
          </select>
          {errors.levelOfStudy && (
            <p className="text-red-600">{errors.levelOfStudy.message}</p>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Phone
            </label>
            {errors.phone ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: /^(010|011|012|015)[0-9]{8}$/,
                message:
                  "Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015 and followed by 8 digits.",
              },
            })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              GPA (1 - 4)
            </label>
            {errors.gpaOption ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("gpaOption", { required: "GPA is required" })}
            onChange={handleGpaChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select GPA</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
            <option value="other">Other</option>
          </select>
          {errors.gpaOption && (
            <p className="text-red-600">{errors.gpaOption.message}</p>
          )}

          {gpaOther && (
            <input
              type="text"
              {...register("gpa", {
                required: "GPA is required when 'Other' is selected",
                min: { value: 1, message: "GPA must be between 1 and 5" },
                max: { value: 5, message: "GPA must be between 1 and 5" },
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "GPA must be a valid number",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
              placeholder="Enter GPA"
              onChange={(e) => {
                setValue("gpa", e.target.value, { shouldValidate: true });
                saveDataToLocalStorage();
              }}
            />
          )}
          {errors.gpa && <p className="text-red-600">{errors.gpa.message}</p>}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Gender
            </label>
            {errors.gender ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-600">{errors.gender.message}</p>
          )}

          <div className="flex items-center mt-4">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Date of Birth
            </label>
            {errors.dateOfBirth ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            placeholder="Select your birth date"
          />
          {errors.dateOfBirth && (
            <p className="text-red-600">{errors.dateOfBirth.message}</p>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Field of Study
            </label>
            {errors.fieldOfStudyOther ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("fieldOfStudy", {
              required: "Field of Study is required",
            })}
            onChange={handleFieldOfStudyChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select Field of Study</option>
            {fieldsOfStudy.map((field) => (
              <option key={field._id} value={field._id}>
                {field.fieldOfStudy}
              </option>
            ))}
            {/* {isoptionFieldOfStudy && <option value="other">Other</option>} */}
          </select>
          {showOtherFieldOfStudy && (
            <>
              <input
                type="text"
                {...register("fieldOfStudyOther", {
                  required:
                    "Field of Study is required when 'Other' is selected",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      "Field of Study must only contain letters and spaces",
                  },
                  validate: {
                    startsWithCapital: (value) =>
                      /^[A-Z]/.test(value) ||
                      "Title must start with a capital letter",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
                placeholder="Please specify"
                onChange={(e) => {
                  setfieldOfStudyOther(e.target.value);
                  saveDataToLocalStorage();
                  setShowAddFieldButton(e.target.value.trim() !== "");
                }}
              />

              {errors.fieldOfStudyOther && (
                <p className="text-red-600">
                  {errors.fieldOfStudyOther.message}
                </p>
              )}

              {showAddFieldButton && (
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddFieldOfStudy}
                  disabled={loading}
                >
                  {loading ? "Adding....." : "Add"}
                </button>
              )}
            </>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Course Type
            </label>
            {errors.courseTypeOther ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <select
            {...register("courseType", { required: "Course Type is required" })}
            onChange={handleCourseTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
          >
            <option value="">Select Course Type</option>
            {courseTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.courseType}
              </option>
            ))}
            {/* {isoption && <option value="other">Other</option>} */}
          </select>

          {showOtherCourseType && (
            <>
              <input
                type="text"
                {...register("courseTypeOther", {
                  required: "Course Type is required when 'Other' is selected",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Course Type must only contain letters and spaces",
                  },
                  validate: {
                    startsWithCapital: (value) =>
                      /^[A-Z]/.test(value) ||
                      "Title must start with a capital letter",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
                placeholder="Please specify"
                onChange={(e) => {
                  setCourseTypeOther(e.target.value);
                  // setValue("courseTypeOther", e.target.value, {
                  //   shouldValidate: true,

                  // });

                  saveDataToLocalStorage();
                  setShowAddButton(e.target.value.trim() !== "");
                }}
              />
              {errors.courseTypeOther && (
                <p className="text-red-600">{errors.courseTypeOther.message}</p>
              )}

              {showAddButton && (
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddCourseType}
                  disabled={loading}
                >
                  {loading ? "Adding....." : "Add"}
                </button>
              )}
            </>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Military Status Image
            </label>
            {errors.militaryStatusImage ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef1}
            {...register("militaryStatusImage", {
              required: "Military status image is required",
              validate: {
                validType: (value) =>
                  value[0]?.type.startsWith("image/") || "Invalid image type",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 1)}
          />
          {errors.militaryStatusImage && (
            <p className="text-red-600">{errors.militaryStatusImage.message}</p>
          )}
          {selectedImage1 && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage1)}
                alt="Military Status"
                className="w-24 h-24"
              />
            </div>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              ID Image
            </label>
            {errors.IDImage ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef2}
            {...register("IDImage", {
              required: {
                value: !selectedImage2,
                message: "IDImage is required",
              },
              validate: {
                validType: (value) =>
                  value[0]?.type.startsWith("image/") || "Invalid image type",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 2)}
          />
          {errors.IDImage && (
            <p className="text-red-600">{errors.IDImage.message}</p>
          )}
          {selectedImage2 && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage2)}
                alt="Military Status"
                className="w-24 h-24"
              />
            </div>
          )}

          <div className="flex items-center">
            <label className="text-[#8A690F] mr-2 font-medium text-xl">
              Graduation Image
            </label>
            {errors.graduationImage ? (
              <FaExclamationCircle className="text-red-600" />
            ) : (
              <FaCheckCircle className="text-green-600" />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef3}
            {...register("graduationImage", {
              required: {
                value: !selectedImage3?.name,
                message: "graduationImage is required",
              },

              validate: {
                validType: (value) =>
                  value[0]?.type.startsWith("image/") || "Invalid image type",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 3)}
          />
          {errors.graduationImage && (
            <p className="text-red-600">{errors.graduationImage.message}</p>
          )}
          {selectedImage3 && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage3)}
                alt="Military Status"
                className="w-24 h-24"
              />
            </div>
          )}
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
        </form>
      </div>
    </div>
  );
}


















useEffect(() => {
  const savedData = localStorage.getItem("form1Data");

  if (savedData) {
    const graduationImageBase64 = localStorage.getItem("graduationImage");
    if (graduationImageBase64) {
      const graduationImage = base64ToFile(
        graduationImageBase64,
        "graduation_image.png"
      );
      setSelectedImage3(graduationImage);
      
      // هنا بنحدث قيمة الـ graduationImage يدويًا في الفورم
      setValue("graduationImage", graduationImage);
      console.log("Retrieved Graduation Image:", graduationImage);
    }
  }
}, [setValue]); // تأكد إنك أضفت setValue للـ dependencies

// كود الفورم:
<input
  type="file"
  ref={fileInputRef3}
  {...register("graduationImage", {
    required: {
      value: !selectedImage3, // هنا التأكد من عدم وجود صورة مسترجعة
      message: "Graduation image is required",
    },
    validate: {
      validType: (value) =>
        value.length === 0 || value[0]?.type.startsWith("image/") || "Invalid image type",
    },
  })}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-[#003a65] focus:ring-[#003a65] focus:border-[#003a65]"
  accept="image/*"
  onChange={(e) => handleImageChange(e, 3)}
/>

{selectedImage3 && (
  <div className="mt-4">
    <img
      src={URL.createObjectURL(selectedImage3)}
      alt="Graduation Image"
      className="w-24 h-24"
    />
  </div>
)}
