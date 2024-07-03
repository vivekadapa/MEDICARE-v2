import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Add Tailwind CSS import
import { GiHospital } from 'react-icons/gi';
import { IoIosPin, IoIosCall, IoMdMail, IoIosPeople, IoMdCheckmark, IoIosShareAlt } from 'react-icons/io';
import { IoSearchOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/getAllHospitals?isApproved=approved`)
            .then((res) => res.json())
            .then((data) => {
                setHospitals(data.data);
            })
            .catch((err) => console.log('Error fetching hospitals', err));
    }, []);

    const filteredHospitals = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className='min-h-screen my-4 py-4 px-8 max-[400px]:px-1 -z-10'>
                <div className='text-center relative w-96 mx-auto max-[400px]:w-64'>
                    <IoSearchOutline className='text-xl absolute top-[50%] left-4 -translate-y-1/2' />
                    <input
                        type="text"
                        placeholder="Search by hospital name"
                        className="px-12 py-2 border-2 border-teal-700 rounded-md w-96 outline-none max-[400px]:w-64"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={filteredHospitals.length === 0 ? 'flex items-center justify-center  ' : 'my-4'}>
                    {filteredHospitals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredHospitals.map((hospital) => (
                                <div key={hospital._id} className="relative bg-white max-w-[500px] p-8 rounded-md shadow-md">
                                    <MdVerifiedUser className='text-2xl text-teal-500' />
                                    <img
                                        src={'/hosp.jpg'}
                                        alt={hospital.name}
                                        className="mb-4 text-center mx-auto rounded-md"
                                    />
                                    {/* <div className='flex justify-between'> */}
                                    <div className="flex justify-between mb-4">
                                        <div className='flex items-baseline'>
                                            <GiHospital className="text-teal-800 text-lg mr-2" />
                                            <h2 className="text-xl font-semibold text-teal-800">{hospital.name}</h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <IoIosPin className="text-teal-700 text-lg mr-1" />
                                            <p className="text-teal-700">{hospital.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center mb-2">
                                            <IoIosCall className="text-teal-700 text-lg mr-2" />
                                            <p className="text-teal-700">{hospital.phoneNumber}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <IoMdMail className="text-teal-700 text-lg mr-2" />
                                            <p className="text-teal-700">{hospital.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center mb-2">
                                            <IoIosPeople className="text-teal-700 text-lg mr-2" />
                                            <p className="text-teal-700 font-semibold">Doctors: {hospital.doctors}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <IoIosShareAlt className="text-teal-700 text-lg mr-2" />
                                            <div className="flex gap-2">
                                                {hospital.socials.map((social, index) => (
                                                    <a
                                                        key={index}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-teal-700"
                                                    >
                                                        {social.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* </div> */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-xl'>No matching hospitals found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default HospitalList;
