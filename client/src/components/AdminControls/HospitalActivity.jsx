import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPen, FaArrowLeft } from 'react-icons/fa';

const HospitalActivity = () => {
    const { hospId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hospital, setHospital] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [isEditingPinCode, setIsEditingPinCode] = useState(false);
    const [updatedPinCode, setUpdatedPinCode] = useState('');
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [isEditingApproved, setIsEditingApproved] = useState(false);
    const [updatedApproved, setUpdatedApproved] = useState('');

    // Handle function to update hospital's name
    const handleUpdateName = async () => {
        try {
            console.log(hospId, updatedName)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/updateHospital/${hospId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update hospital name. Status: ${response.status}`);
            }
            setHospital(prevHospital => ({
                ...prevHospital,
                name: updatedName
            }));
            setIsEditingName(false);
        } catch (error) {
            console.error('Error updating hospital name:', error);
        }
    };

    // Handle function to update hospital's address
    const handleUpdateAddress = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/updateHospital/${hospId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: updatedAddress }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update hospital address. Status: ${response.status}`);
            }
            setHospital(prevHospital => ({
                ...prevHospital,
                address: updatedAddress
            }));
            setIsEditingAddress(false);
        } catch (error) {
            console.error('Error updating hospital address:', error);
        }
    };

    // Handle function to update hospital's pin code
    const handleUpdatePinCode = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/updateHospital/${hospId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pinCode: updatedPinCode }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update hospital pin code. Status: ${response.status}`);
            }
            setHospital(prevHospital => ({
                ...prevHospital,
                pinCode: updatedPinCode
            }));
            setIsEditingPinCode(false);
        } catch (error) {
            console.error('Error updating hospital pin code:', error);
        }
    };

    // Handle function to update hospital's phone number
    const handleUpdatePhoneNumber = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/updateHospital/${hospId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: updatedPhoneNumber }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update hospital phone number. Status: ${response.status}`);
            }
            setHospital(prevHospital => ({
                ...prevHospital,
                phoneNumber: updatedPhoneNumber
            }));
            setIsEditingPhoneNumber(false);
        } catch (error) {
            console.error('Error updating hospital phone number:', error);
        }
    };

    // Handle function to update hospital's email
    const handleUpdateEmail = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/updateHospital/${hospId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: updatedEmail }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update hospital email. Status: ${response.status}`);
            }
            setHospital(prevHospital => ({
                ...prevHospital,
                email: updatedEmail
            }));
            setIsEditingEmail(false);
        } catch (error) {
            console.error('Error updating hospital email:', error);
        }
    };

   

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/gethospital/${hospId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch hospital details. Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.hospital);
                setHospital(data.hospital);
                setUpdatedName(data.hospital.name);
                setUpdatedAddress(data.hospital.address);
                setUpdatedPinCode(data.hospital.pinCode);
                setUpdatedPhoneNumber(data.hospital.phoneNumber[0]);
                setUpdatedEmail(data.hospital.email);
                setUpdatedApproved(data.hospital.isApproved);
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        };

        fetchHospitalDetails();
    }, []);

    return (
        <>
            <Link to="/admin-verification" className="flex items-center mb-4 text-teal-500 hover:text-teal-600">
                <span className="text-lg">
                    <FaArrowLeft className="mr-2" size={24} />
                </span>
                Back
            </Link>

            <div className="bg-white shadow-md rounded-lg overflow-hidden w-1/2 text-center ml-52">
                <h2 className="text-2xl font-bold mb-2 ml-2 text-teal-800">Hospital Profile</h2>

                <div className="px-4 py-4">
                    {/* Hospital Name */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Name:</span>
                        {hospital && (
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
                                    <span className="text-sm font-semibold mr-2">{hospital.name}</span>
                                    <FaPen
                                        className="cursor-pointer text-teal-500"
                                        onClick={() => setIsEditingName(true)}
                                    />
                                </div>
                            )
                        )}

                    </div>
                    {/* Hospital Address */}

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Address:</span>
                        {isEditingAddress ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedAddress}
                                    onChange={(e) => setUpdatedAddress(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdateAddress}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{hospital?.address}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingAddress(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Hospital Pin Code */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Pin Code:</span>
                        {isEditingPinCode ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedPinCode}
                                    onChange={(e) => setUpdatedPinCode(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdatePinCode}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{hospital?.pinCode}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingPinCode(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Hospital Phone Number */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">Phone Number:</span>
                        {isEditingPhoneNumber ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={updatedPhoneNumber}
                                    onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                />
                                <button
                                    onClick={handleUpdatePhoneNumber}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-sm font-semibold mr-2">{hospital?.phoneNumber}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingPhoneNumber(true)}
                                />
                            </div>
                        )}
                    </div>
                    {/* Hospital Email */}
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
                                <span className="text-sm font-semibold mr-2">{hospital?.email}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingEmail(true)}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </>
    );
};

export default HospitalActivity;
