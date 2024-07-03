import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa';
import Rating from 'react-rating-stars-component';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';



const StarRating = ({ rating }) => {
    return (
        <Rating
            count={5}
            value={rating}
            size={24}
            edit={false}
            activeColor="#ffd700"
            emptyIcon={<FaStar className="text-gray-300" />}
        />
    );
};

export const Doctor = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState({});
    const [averageRating, setAverageRating] = useState(0);

    const cookie = new Cookies();
    const navigate = useNavigate();
    const token = cookie.get('TOKEN');
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');


    useEffect(() => {
        if (location.state && location.state.doctor) {
            setDoctor(location.state.doctor);
            if (location.state.doctor.reviews && location.state.doctor.reviews.length > 0) {
                const totalRating = location.state.doctor.reviews.reduce((sum, review) => sum + review.rating, 0);
                const avgRating = totalRating / location.state.doctor.reviews.length;
                setAverageRating(avgRating);
            }
        }
        console.log(location.state?.doctor);
    });


    const handleSubmit = async () => {
        navigate('/appointmentform', { state: doctor });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const postReview = async (e) => {
        e.preventDefault();
        console.log(userRating);
        console.log(userReview)
        console.log(userRating, userReview, doctor._id)
        if (!token || !doctor._id) {
            toast.error("Login to write Review")
            return;
        }
        else if (token) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/writereview`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userRating, userReview, docId: doctor._id })
                })
                const data = await response.json();
                console.log(data);
                setDoctor(data.doctor)
                if (!data.success) {
                    navigate('/consultdoctor')
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Login to write a review")
        }

    }

    return (
        <div className="flex flex-col min-h-screen my-12 px-12 items-start gap-8">
            <div className="flex items-start gap-8">
                <img
                    className="w-1/3 h-full object-cover rounded-md shadow-md"
                    src={doctor && doctor.photo || ''}
                    alt={doctor && doctor.name}
                />
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h2 className="text-4xl font-semibold">Dr. {doctor && doctor.name}</h2>
                            <p className="text-xl font-normal my-2">
                                {doctor && doctor.specialization},{doctor && doctor.qualification}
                            </p>
                        </div>
                        {averageRating > 0 ? (
                            <div className="mt-2 flex items-center gap-1">
                                <p className='mt-[0.3rem]'>{averageRating}</p>
                                <Rating
                                    count={5}
                                    value={averageRating}
                                    size={24}
                                    edit={false}
                                    activeColor="#FFDF00"
                                />
                                <p className='mt-[0.3rem]'>({doctor.reviews.length})</p>
                            </div>
                        ) : (
                            <p className="text-md mt-2">No ratings yet</p>
                        )}
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <div className="flex gap-4 items-center">
                            <p className="text-gray-700 flex items-center">
                                <FaEnvelope className="mr-2" />
                                {doctor.email}
                            </p>
                            <p className="h-6 w-[1.5px] text-black bg-gray-700"></p>
                            <p className="text-gray-700 flex items-center">
                                <FaPhoneAlt className="mr-2" />
                                {doctor.phone}
                            </p>
                        </div>
                        <p> <span className='font-semibold mx-2'>Rs {doctor.ticketPrice}/-</span> per appointment</p>
                    </div>

                    <p className="my-2">
                        {doctor.bio}
                    </p>
                    <button
                        onClick={handleSubmit}
                        className="my-4 px-4 py-2 bg-teal-700 text-white rounded-md shadow-md"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
            <div className="w-full mt-4">
                <form onSubmit={postReview}>
                    <div className="flex flex-col">
                        <label htmlFor="rating" className="mr-2">
                            Rate Your Experience
                        </label>
                        <Rating
                            count={5}
                            value={userRating}
                            size={36}
                            onChange={(rating) => setUserRating(rating)}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-100">
                        <div className="px-4 py-2 bg-gray-100 rounded-t-lg ">
                            <label htmlFor="comment" className="sr-only">
                                Write Your Review
                            </label>
                            <textarea
                                id="comment"
                                rows="4"
                                value={userReview}
                                onChange={(e) => setUserReview(e.target.value)}
                                className="w-full px-0 text-sm  bg-gray-100 border-0  focus:ring-0 "
                                placeholder="Write a comment..."
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t ">
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center  text-white bg-teal-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        >
                            Post review
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full mt-4 min-h-[50vh]">
                <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
                {doctor && doctor.reviews && doctor.reviews.length > 0 ? (
                    <ul className='grid grid-cols-2 gap-4'>
                        {doctor.reviews.map((review, index) => (
                            <li key={index} className='rounded-md shadow-md p-4 flex flex-col gap-4'>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <img src={review.user ? review.user.photo : ""} className='w-12 rounded-full' alt="" />
                                        <p className='text-xl text-black' >{review.user ? review.user.name : ""}</p>
                                    </div>
                                    <div>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <div>
                                    {review.reviewText}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};
