import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPen, FaArrowLeft } from 'react-icons/fa';

const UserActivity = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [photo, setPhoto] = useState(null); // For uploading new photo
    const [isEditingBloodType, setIsEditingBloodType] = useState(false);
    const [updatedBloodType, setUpdatedBloodType] = useState('');
    const [isEditingGender, setIsEditingGender] = useState(false);
    const [updatedGender, setUpdatedGender] = useState('');
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [updatedPhone, setUpdatedPhone] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [medicineHistory, setMedicineHistory] = useState([]);

    useEffect(() => {
        
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getuser/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user details. Status: ${response.status}`);
                }
                const userData = await response.json();
                setUser(userData.user);
                setUpdatedName(userData.user.name);
                setUpdatedBloodType(userData.user.bloodType);
                setUpdatedGender(userData.user.gender);
                setUpdatedPhone(userData.user.phone);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getuserappointments/${userId}`);
                const data = await response.json();
                console.log(data.user.appointments);
                setAppointments(data.user.appointments); 
            } catch (error) {
                console.log(error);
            }
        };


        const fetchMedicineHistory = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getmedicinehistory/${userId}`);
                const data = await response.json();
                console.log(data);
                setMedicineHistory(data.user.orders);
                console.log(data.user.orders);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserDetails();
        fetchAppointments();
        fetchMedicineHistory();

    }, [userId]);


    const handleUpdateName = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update user name. Status: ${response.status}`);
            }
            setUser(prevUser => ({
                ...prevUser,
                name: updatedName
            }));
            setIsEditingName(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating user name:', error);
        }
    };

    // Update handler for bloodType
    const handleUpdateBloodType = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bloodType: updatedBloodType }), // Update with bloodType
            });
            if (!response.ok) {
                throw new Error(`Failed to update user blood type. Status: ${response.status}`);
            }
            setUser(prevUser => ({
                ...prevUser,
                bloodType: updatedBloodType
            }));
            setIsEditingBloodType(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating user blood type:', error);
        }
    };

    // Update handler for gender
    const handleUpdateGender = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gender: updatedGender }), // Update with gender
            });
            if (!response.ok) {
                throw new Error(`Failed to update user gender. Status: ${response.status}`);
            }
            setUser(prevUser => ({
                ...prevUser,
                gender: updatedGender
            }));
            setIsEditingGender(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating user gender:', error);
        }
    };

    // Update handler for phone
    const handleUpdatePhone = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: updatedPhone }), // Update with phone
            });
            if (!response.ok) {
                throw new Error(`Failed to update user phone. Status: ${response.status}`);
            }
            setUser(prevUser => ({
                ...prevUser,
                phone: updatedPhone
            }));
            setIsEditingPhone(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating user phone:', error);
        }
    };

    const handlePhotoUpload = async () => {
        try {
            if (!photo) {
                console.error('No photo selected');
                return;
            }

            const formData = new FormData();
            formData.append('photo', photo);

            console.log('FormData:', formData);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateprofile/${userId}`, {
                method: 'PUT',
                body: formData,
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`Failed to upload photo. Status: ${response.status}`);
            }

            const updatedUserData = await response.json();

            setUser(prevUser => ({
                ...prevUser,
                photo: updatedUserData.user.photo
            }));

        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>

            <Link to="/users" className="flex items-center mb-4 text-teal-500 hover:text-teal-600">
                <span className="text-lg">
                    <FaArrowLeft className="mr-2" size={24} />
                </span>
                Back
            </Link>

        <div className="mx-auto w-3/4 mt-8">
   
            <div className="bg-white max-w-md mx-auto shadow-md rounded-lg overflow-hidden">
                <h2 className="text-2xl text-center font-bold my-2 ml-2 text-teal-800">User Profile</h2>

                <div className="px-4 py-4">
                    {/* User Photo */}
                    <div className="flex justify-center items-center mb-4">
                        <div className="relative">
                            <img src={user.photo} alt="User" className="rounded-full h-24 w-24 object-cover" />
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
                    </div>
                    {/* User Name */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Name:</span>
                        {isEditingName ? (
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
                                <span className="text-sm font-semibold mr-2">{user.name}</span>
                                <FaPen
                                    className="cursor-pointer text-teal-500"
                                    onClick={() => setIsEditingName(true)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        {/* Blood Type */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Blood Type:</span>
                            {isEditingBloodType ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={updatedBloodType}
                                        onChange={(e) => setUpdatedBloodType(e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
                                    />
                                    <button
                                        onClick={handleUpdateBloodType}
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="text-sm font-semibold mr-2">{user.bloodType}</span>
                                    <FaPen
                                        className="cursor-pointer text-teal-500"
                                        onClick={() => setIsEditingBloodType(true)}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Gender */}
                        <div className="flex justify-between items-center mt-2">
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
                                    <span className="text-sm font-semibold mr-2">{user.gender}</span>
                                    <FaPen
                                        className="cursor-pointer text-teal-500"
                                        onClick={() => setIsEditingGender(true)}
                                    />
                                </div>
                            )}
                        </div>
                        {/* Phone */}
                        <div className="flex justify-between items-center mt-2">
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
                                    <span className="text-sm font-semibold mr-2">{user.phone}</span>
                                    <FaPen
                                        className="cursor-pointer text-teal-500"
                                        onClick={() => setIsEditingPhone(true)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
                <h2 className="text-2xl font-bold mb-2 ml-4 text-teal-800">Doctor Appointments</h2>
                <div className="bg-white rounded shadow mt-4 mx-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointment Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient's Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age, Gender</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slot</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                            <tbody className="divide-y divide-gray-200">
                                {appointments && appointments.map(appointment => (
                                    <tr key={appointment._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{`${appointment.patientAge}, ${appointment.patientGender}`}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{`${appointment.slot.startTime} - ${appointment.slot.endTime}`}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${appointment.status === 'approved' ? 'text-green-500' : appointment.status === 'rejected' ? 'text-red-500' : 'text-blue-500'}`}>{appointment.status}</td>
                                    </tr>
                                ))}
                            </tbody>

                    </table>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
                <h1 className="text-2xl font-bold mb-4 ml-4 text-teal-800">Medicine Purchase History</h1>
                <div className="bg-white rounded shadow mt-4 mx-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Status</th>
                            </tr>
                        </thead>
                            <tbody className="divide-y divide-gray-200">
                                {medicineHistory && medicineHistory.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.medicines.map((medicine) => (
                                                <div key={medicine.medicineId}>{medicine.medicineName}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.medicines.map((medicine) => (
                                                <div key={medicine.medicineId}>{medicine.quantity}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">₹{order.totalAmount.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.cancelOrder && !order.deliveryStatus ? (
                                                <span className="text-red-500">Order Cancelled</span>
                                            ) : order.deliveryStatus ? (
                                                <span className="text-green-500">Delivered</span>
                                            ) : (
                                                <span className="text-blue-500">Yet to Deliver</span>
                                            )}
                                        </td>
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

export default UserActivity;
