import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from "react-icons/lu";
import { PiCertificateDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const DoctorCard = ({ doctor }) => {
    const { _id, name, email, role, phone, photo, specialization, qualification, reviews } = doctor;
    console.log(phone)
    const [avgRating, setAvgRating] = useState(null);
    const navigate = useNavigate();

    const handleGetAppointment = () => {
        navigate('/doctor', {
            state: { doctor }
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log("hello");
    };

    useEffect(() => {
        const calculateAvgRating = () => {
            if (reviews.length !== 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / reviews.length;
                setAvgRating(averageRating);
            } else {
                setAvgRating(0);
            }
        };
        calculateAvgRating();
    }, [reviews]);

    return (
        <div className="mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-4">
            <img className="w-full h-64 object-cover" src={photo || ''} alt={name} />

            <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Dr. {name}</h2>
                    {
                        avgRating > 0 ? (
                            <Rating
                                count={5}
                                value={avgRating}
                                size={20}
                                edit={false}
                                activeColor="#FFDF00"
                            />
                        ) : (
                            <p>No Ratings</p>
                        )
                    }

                </div>

                <div className="mb-4 flex justify-between">
                    <p className="text-gray-700 flex items-center">
                        <FaEnvelope className="mr-2" />
                        {email}
                    </p>
                    <p className="text-gray-700 flex items-center">
                        <FaPhoneAlt className="mr-2" />
                        {phone}
                    </p>
                </div>

                <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-700 flex items-center text-lg">
                        <LuStethoscope className="mr-2" />{specialization}
                    </p>
                    <p className="text-gray-700 flex items-center text-lg">
                        <PiCertificateDuotone className='mr-2' />{qualification}
                    </p>
                </div>
            </div>
            <button onClick={handleGetAppointment} className='mx-auto mb-4 px-4 py-2 flex justify-center w-36 bg-teal-500 text-white rounded-md'>View</button>
        </div>
    );
};

export default DoctorCard;
