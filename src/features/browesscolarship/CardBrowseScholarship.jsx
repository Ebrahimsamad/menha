import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSelect } from '../../services/SearchSelect';
import PrimaryButton from '../../ui/PrimaryButton';
import '../../ui/Button';

const ScholarshipComponent = () => {
    const navigate = useNavigate();
    const [fieldOfStudy, setFieldOfStudy] = useState([]);
    const [loading, setLoading] = useState(true);

    const colors = ['#003a65', '#004e8c', ];

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
        navigate(`/scholarships/${_id}`);
    };

    return (
        <div className="flex justify-center p-8 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl">
                {loading ? (
                    <p className="col-span-full text-center text-gray-600">Loading scholarships...</p>
                ) : fieldOfStudy.length > 0 ? (
                    fieldOfStudy.map((field, index) => (
                        <div
                            key={field._id}
                            className="flex flex-col items-start p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            style={{ backgroundColor: '#ffffff' }}
                        >
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            >
                                <span className="text-xl md:text-2xl font-bold text-white">{getInitials(field.fieldOfStudy)}</span>
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
