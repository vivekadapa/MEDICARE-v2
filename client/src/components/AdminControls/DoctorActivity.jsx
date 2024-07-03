import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPen, FaArrowLeft } from 'react-icons/fa';

const DoctorActivity = () => {
    const { docId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [patients, setPatients] = useState([]);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [updatedBio, setUpdatedBio] = useState('');
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [isEditingSpecialization, setIsEditingSpecialization] = useState(false);
    const [updatedSpecialization, setUpdatedSpecialization] = useState('');
    const [isEditingQualification, setIsEditingQualification] = useState(false);
    const [updatedQualification, setUpdatedQualification] = useState('');
    const [isEditingGender, setIsEditingGender] = useState(false);
    const [updatedGender, setUpdatedGender] = useState('');
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [updatedPhoto, setUpdatedPhoto] = useState('');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    
    // Handle function to update doctor's name
    const handleUpdateName = async () => {
        try {
            const response = await fetch(`http:///doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor name. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                name: updatedName
            }));
            setIsEditingName(false); 
        } catch (error) {
            console.error('Error updating doctor name:', error);
        }

    };

    // Handle function to update doctor's bio
    const handleUpdateBio = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bio: updatedBio }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor name. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                bio: updatedBio
            }));
            setIsEditingBio(false);
        } catch (error) {
            console.error('Error updating doctor name:', error);
        }

    };

    // Handle function to update doctor's price
    const handleUpdatePrice = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: updatedPrice }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor price. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                price: updatedPrice
            }));
            setIsEditingPrice(false);
        } catch (error) {
            console.error('Error updating doctor price:', error);
        }
    };

    // Handle function to update doctor's specialization
    const handleUpdateSpecialization = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ specialization: updatedSpecialization }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor specialization. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                specialization: updatedSpecialization
            }));
            setIsEditingSpecialization(false);
        } catch (error) {
            console.error('Error updating doctor specialization:', error);
        }
    };

    // Handle function to update doctor's qualification
    const handleUpdateQualification = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qualification: updatedQualification }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor qualification. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                qualification: updatedQualification
            }));
            setIsEditingQualification(false);
        } catch (error) {
            console.error('Error updating doctor qualification:', error);
        }
    };

    // Handle function to update doctor's gender
    const handleUpdateGender = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gender: updatedGender }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor gender. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                gender: updatedGender
            }));
            setIsEditingGender(false);
        } catch (error) {
            console.error('Error updating doctor gender:', error);
        }
    };

    // Handle function to update doctor's phone
    const handleUpdatePhone = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: updatedPhone }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor phone. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                phone: updatedPhone
            }));
            setIsEditingPhone(false);
        } catch (error) {
            console.error('Error updating doctor phone:', error);
        }
    };

    // Handle function to update doctor's email
    const handleUpdateEmail = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateDoctor/${docId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: updatedEmail }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update doctor email. Status: ${response.status}`);
            }
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                email: updatedEmail
            }));
            setIsEditingEmail(false);
        } catch (error) {
            console.error('Error updating doctor email:', error);
        }
    };




    useEffect(() => {

        const fetchDoctorDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/getdoctor/${docId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user details. Status: ${response.status}`);
                }
                const doctorData = await response.json();
                // console.log(doctorData.doctor);
                setDoctor(doctorData.doctor);
                setUpdatedName(doctorData.doctor.name);
                setUpdatedBio(doctorData.doctor.bio);
                setUpdatedPrice(doctorData.doctor.price);
                setUpdatedSpecialization(doctorData.doctor.specialization);
                setUpdatedQualification(doctorData.doctor.qualification);
                setUpdatedGender(doctorData.doctor.gender);
                setUpdatedPhone(doctorData.doctor.phone);
                setUpdatedPhoto(doctorData.doctor.photo);
                setUpdatedEmail(doctorData.doctor.email);


            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchPatients = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/getnewappointments/${docId}`);
                const doctor = await response.json();
                // console.log(doctor.data.appointments);
                setPatients(doctor.data.appointments);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchDoctorDetails();
        fetchPatients();
    }, []);

    return (
        <>
            <Link to="/admin-verification" className="flex items-center mb-4 text-teal-500 hover:text-teal-600">
                <span className="text-lg">
                    <FaArrowLeft className="mr-2" size={24} />
                </span>
                Back
            </Link>


            <div className="bg-white shadow-md max-w-xl mx-auto rounded-lg overflow-hidden">
                <h2 className="text-2xl font-bold my-2 ml-2 text-center text-teal-800">Doctor Profile</h2>

                <div className="px-4 py-4">
                    {/* Doctor Photo */}
                    <div className="flex justify-center  mb-4">
                        {doctor && (
                            <div className="relative">
                                <img src={doctor.photo} alt="Doctor" className="rounded-full h-24 w-24 object-cover" />
                                <label htmlFor="photoInput" className="absolute mt-20 ml-20 cursor-pointer">
                                    <FaPen
                                        className="text-teal-500 cursor-pointer"
                                        onClick={() => handlePhotoUpload()}
                                    />
                                    <input
                                        type="file"
                                        id="photoInput"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Doctor Name */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Name:</span>
                        {doctor && (
                            isEditingName ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                    />
                                    <button
                                        onClick={handleUpdateName}
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="text-sm font-semibold mr-2">{doctor.name}</span>
                                    <FaPen
                                        className="cursor-pointer text-teal-500"
                                        onClick={() => setIsEditingName(true)}
                                    />
                                </div>
                            )
                        )}

                    </div>
                    {/* Doctor Bio */}

                    {/* <div className="flex  items-center mt-4">
                        <span className="text-sm text-gray-600">Bio:</span>
                        {isEditingBio ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedBio}
                                    onChange={(e) => setUpdatedBio(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateBio}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.bio}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingBio(true)}
                                />
                            </div>
                        )}
                    </div> */}
                    {/* Doctor Price */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Price:</span>
                        {isEditingPrice ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedPrice}
                                    onChange={(e) => setUpdatedPrice(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdatePrice}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.price}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingPrice(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Doctor Specialization */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Specialization:</span>
                        {isEditingSpecialization ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedSpecialization}
                                    onChange={(e) => setUpdatedSpecialization(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateSpecialization}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.specialization}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingSpecialization(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Doctor Qualification */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Qualification:</span>
                        {isEditingQualification ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedQualification}
                                    onChange={(e) => setUpdatedQualification(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateQualification}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.qualification}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingQualification(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Doctor Gender */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Gender:</span>
                        {isEditingGender ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedGender}
                                    onChange={(e) => setUpdatedGender(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateGender}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.gender}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingGender(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Doctor Phone */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Phone:</span>
                        {isEditingPhone ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedPhone}
                                    onChange={(e) => setUpdatedPhone(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdatePhone}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.phone}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingPhone(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Doctor Email */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Email:</span>
                        {isEditingEmail ? (
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateEmail}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{doctor?.email}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingEmail(true)}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>



            <div className="mt-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <h2 className="text-2xl font-bold mb-2 ml-2 text-teal-800">Patient Details</h2>
                    <div className="bg-white rounded shadow mt-4 mx-4">
                        <table className="min-w-full divide-y divide-gray-200">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b text-start">Appointment ID</th>
                                    <th className="py-2 px-4 border-b text-start">User ID</th>
                                    <th className="py-2 px-4 border-b text-start">Name</th>
                                    <th className="py-2 px-4 border-b text-start">Age, Gender</th>
                                    <th className="py-2 px-4 border-b text-start">Problem</th>
                                    <th className="py-2 px-4 border-b text-start">Appointment Date</th>
                                    <th className="py-2 px-4 border-b text-start">Slot</th>
                                    <th className="py-2 px-4 border-b text-start">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient._id}>
                                        <td className="py-2 px-4 border-b">{patient._id}</td>
                                        <td className="py-2 px-4 border-b">{patient.user._id}</td>
                                        <td className="py-2 px-4 border-b">{patient.patientName}</td>
                                        <td className="py-2 px-4 border-b">{`${patient.patientAge}, ${patient.patientGender}`}</td>
                                        <td className="py-2 px-4 border-b">{patient.patientProblem}</td>
                                        <td className="py-2 px-4 border-b">{new Date(patient.appointmentDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 border-b">{`${patient.slot.startTime} - ${patient.slot.endTime}`}</td>
                                        <td className={`px-2 py-4 border-b ${patient.status === 'approved' ? 'text-green-500' : patient.status === 'rejected' ? 'text-red-500' : 'text-orange-500'}`}>{patient.status}</td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};

export default DoctorActivity;
