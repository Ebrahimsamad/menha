import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../../ui/PrimaryButton';
import { getAllSelect } from '../../services/SearchSelect';
import { useNavigate } from 'react-router-dom';
import { impact } from '../../services/ImpactMen7a';

export default function Search() {
    const [courseType, setCourseType] = useState([]);
    const [courseLanguage, setCourseLanguage] = useState([]);
    const [fieldOfStudy, setFieldOfStudy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ImpactScholarships, setImpactScholarships] = useState(0);
    const navigate = useNavigate();
    const courseTypeRef = useRef(null);
    const languageRef = useRef(null);
    const fieldOfStudyRef = useRef(null);
    const courseTypeRef2 = useRef(null);
    const languageRef2 = useRef(null);
    const fieldOfStudyRef2 = useRef(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllSelect();
                const dataImpact = await impact()
                setImpactScholarships(dataImpact.totalScholarships);
                setCourseType(data.courseType);
                setCourseLanguage(data.courseLanguage);
                setFieldOfStudy(data.fieldOfStudy);
            } catch (error) {
                setError("Error fetching data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSearchBtn = (e) => {
        e.preventDefault();
        let courseTypeId
        let languageId
        let fieldOfStudy
        if (e.target.id === "formOne") {
            courseTypeId = courseTypeRef.current.value;
            languageId = languageRef.current.value;
            fieldOfStudy = fieldOfStudyRef.current.value;
        } else {

            courseTypeId = courseTypeRef2.current.value;
            languageId = languageRef2.current.value;
            fieldOfStudy = fieldOfStudyRef2.current.value;
        }
        const params = {
            page: 1
        };
        
        if (courseTypeId) {
            params.courseTypeId = courseTypeId;
        }
        if (languageId) {
            params.languageId = languageId;
        }
        if (fieldOfStudy) {
            params.fieldOfStudy = fieldOfStudy;
        }
        const query = new URLSearchParams(params).toString();

        navigate(`/scholarships?${query}`);
    };

    return (
        <>
            <div id="search" className="w-full h-[600px] bg-[url('/search-bg.jpg')] bg-cover flex flex-col justify-center items-center">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-semibold text-white">INTERNATIONAL PROGRAMMES 2024/2025</h2>
                    <p className="text-white text-xl mt-2">{loading ? (
                        <span >...</span>
                    ) : (
                        <span>{ImpactScholarships}</span>
                    )} Programmes available</p>
                </div>

                <div className="hidden sm:block md:w-[90%] lg:w-[60%] p-8 bg-[#003A65] bg-opacity-80 text-white">
                    <h3 className="text-center text-2xl font-semibold mb-6">Choose your programme!</h3>

                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <form id="formOne" onSubmit={handleSearchBtn}>
                        <div className="flex -mx-2 mb-6">
                            <div className="w-full md:w-1/3 px-2 mb-4">
                                <label htmlFor="courseType" className="block text-sm font-medium text-white">
                                    <div className='flex mb-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                        </svg>
                                        <p className='ms-1'>Course type</p>
                                    </div>
                                </label>
                                <select ref={courseTypeRef} className="w-full p-2 border border-gray-200 rounded text-black" id="courseTypeMobile" name="courseTypeId">
                                    <option value="">Please select</option>
                                    {courseType.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        courseType.map(type => (
                                            <option key={type._id} value={type._id}>{type.courseType}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="w-full md:w-1/3 px-2 mb-4">
                                <label htmlFor="language" className="block text-sm font-medium text-white">
                                    <div className='flex mb-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                        </svg>
                                        <p className='ms-1'>Course Language</p>
                                    </div>
                                </label>
                                <select ref={languageRef} className="w-full p-2 border border-gray-200 rounded text-black" id="language" name="languageId">
                                    <option value="">Please select</option>
                                    {courseLanguage.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        courseLanguage.map(lang => (
                                            <option key={lang._id} value={lang._id}>{lang.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="w-full md:w-1/3 px-2 mb-4">
                                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-white">
                                    <div className='flex mb-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <p className='ms-1'>Field of Study</p>
                                    </div>
                                </label>
                                <select ref={fieldOfStudyRef} className="w-full p-2 border border-gray-200 rounded text-black" id="fieldOfStudy" name="fieldOfStudyId">
                                    <option value="">Please select</option>
                                    {fieldOfStudy.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        fieldOfStudy.map(field => (
                                            <option key={field._id} value={field._id}>{field.fieldOfStudy}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton
                                type="submit"
                            >
                                Search
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            <div className="sm:hidden w-full p-4 bg-[#003A65] bg-opacity-80 text-white">
                <h3 className="text-center text-xl font-semibold mb-4">Search</h3>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form onSubmit={handleSearchBtn}>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="courseTypeMobile" className="block text-sm font-medium text-white">
                                Course type
                            </label>
                            <select ref={courseTypeRef2} className="w-full p-2 border border-gray-200 rounded text-black" id="courseTypeMobile" name="courseTypeId">
                                <option value="">Please select</option>
                                {courseType.length === 0 ? (
                                    <option>Loading...</option>
                                ) : (
                                    courseType.map(type => (
                                        <option key={type._id} value={type._id}>{type.courseType}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="languageMobile" className="block text-sm font-medium text-white">
                                Course Language
                            </label>
                            <select ref={languageRef2} className="w-full p-2 border border-gray-200 rounded text-black" id="languageMobile" name="languageId">
                                <option value="">Please select</option>
                                {courseLanguage.length === 0 ? (
                                    <option>Loading...</option>
                                ) : (
                                    courseLanguage.map(lang => (
                                        <option key={lang._id} value={lang._id}>{lang.name}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="fieldOfStudyMobile" className="block text-sm font-medium text-white">
                                Field of Study
                            </label>
                            <select ref={fieldOfStudyRef2} className="w-full p-2 border border-gray-200 rounded text-black" id="fieldOfStudyMobile" name="fieldOfStudyId">
                                <option value="">Please select</option>
                                {fieldOfStudy.length === 0 ? (
                                    <option>Loading...</option>
                                ) : (
                                    fieldOfStudy.map(field => (
                                        <option key={field._id} value={field._id}>{field.fieldOfStudy}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton
                                type="submit"
                            >
                                Search
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
