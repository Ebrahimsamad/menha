import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSelect } from '../../services/SearchSelect';
import PrimaryButton from '../../ui/PrimaryButton';

const ScholarshipComponent = () => {
    const navigate = useNavigate();
    const [fieldOfStudy, setFieldOfStudy] = useState([]);
    const [loading, setLoading] = useState(true);

    const colors = [' #e9e9e9', ' #003a65',];
    const color = ['#003a65 ', '#ffffff ',];


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllSelect();
                const fieldOfStudy = Array.isArray(data.fieldOfStudy)
                    ? data.fieldOfStudy.map((item) => ({
                        _id: item._id,
                        fieldOfStudy: item.fieldOfStudy
                    }))
                    : [];
                setFieldOfStudy(fieldOfStudy);
            } catch (error) {
                setFieldOfStudy([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const getInitials = (title) => {
        if (!title) return '';
        const words = title.split(' ');
        return words.length > 1
            ? words.map(word => word[0].toUpperCase()).join('')
            : words[0].substring(0, 2).toUpperCase();
    };

    const handleNavigate = (_id) => {
        navigate(`/scholarships?fieldOfStudy=${_id}`);
    };

    return (
        <div className="flex justify-center p-20 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl w-full">
                {loading ? ([1, 2, 3, 4, 5, 6].map(() => (

                    <div
                        className="flex flex-col items-start p-6 bg-white shadow-lg rounded-lg border border-gray-200 animate-pulse w-full "
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        <div
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 bg-gray-300"
                        >
                            <span className="loading loading-spinner loading-xl text-white"></span>
                        </div>
                        <div className="h-8 bg-gray-300 w-3/4 rounded mb-6"></div>
                        <div className="h-12 bg-gray-200 w-full rounded"></div>
                    </div>


                ))
                ) : fieldOfStudy.length > 0 ? (
                    fieldOfStudy.map((field, index) => (
                        <div
                            key={field._id}
                            className="flex flex-col items-start p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            style={{ backgroundColor: '#ffffff' }}
                        >
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: colors[index % colors.length] ,color:color[index % colors.length]} }
                            >
                                <span className="text-xl md:text-2xl font-bold ">{getInitials(field.fieldOfStudy)}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">{`Scholarships for ${field.fieldOfStudy}`}</h3>
                            <PrimaryButton
                                onClick={() => handleNavigate(field._id)}
                                className="text-white "
                            >
                                View Scholarships
                            </PrimaryButton>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">No scholarships available.</p>
                )}
            </div>
        </div>
    );
};

export default ScholarshipComponent;
