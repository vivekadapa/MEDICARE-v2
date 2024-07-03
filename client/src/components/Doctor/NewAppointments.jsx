import React, { useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie'

export const NewAppointments = () => {

    const { user, setUser } = useAuth();
    useEffect(() => {
        if (user) {
            console.log(user)
        }
        console.log(user)
    }, [])

    const cookies = new Cookies();
    const token = cookies.get('TOKEN');
    const handleAccept = async (appointmentId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateAppointment/approved/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.doctor)
                setUser(data.doctor)
                toast.success('Appointment Accepted Successfully');
            } else {
                // Handle error response
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReject = async (appointmentId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/updateAppointment/rejected/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.doctor)
                setUser(data.doctor)
                toast.success('Appointment Rejected Successfully');
                console.log(data.doctor.appointments)
            } else {
                // Handle error response
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <h1 className='my-4 text-xl font-semibold'>New Appointments</h1>
            {
                user && user.appointments.length !== 0 ? (
                    <div>
                        <ul>
                            {user.appointments.filter((appointment) => appointment.status === 'pending').map((appointment) => (
                                <li key={appointment._id} className="mb-4 p-4 flex flex-col bg-gray-100 gap-2 border rounded shadow-md">
                                    <div className='flex items-center justify-between'>
                                        <p>Booked On: {new Date(appointment.createdAt).toLocaleString()}</p>
                                        <p className="mb-2 font-semibold">Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="mb-2 text-gray-700">Patient's Name: {appointment.patientName}</p>
                                        <p className="mb-2 text-gray-700">{appointment.patientAge},{appointment.patientGender}</p>
                                    </div>
                                    <div>
                                        Patient's Email: {appointment.user && appointment.user.email}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="mb-2 text-gray-700 flex gap-2 items-center">Patient's Problem: {appointment.patientProblem}</p>
                                        <p className="mb-2 text-gray-700 flex gap-2 items-center"> {appointment.doctor.phone}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-sm text-gray-500 px-2 py-2 border-2 shadow-md rounded-md  border-green-400">Slot: {appointment.slot.startTime} - {appointment.slot.endTime}</p>
                                        <p className={`mb-2 text-gray-700 p-2 shadow-md rounded-md ${appointment.status === 'pending' ? 'text-yellow-500 border-2 border-yellow-500' : appointment.status === 'cancelled' ? 'text-red-500  border-2 border-red-500' : 'text-green-500 border-2 border-green-500'}`}>Status: {appointment.status}</p>
                                    </div>
                                    <div className='flex gap-4'>
                                        <button className='bg-blue-600 px-4 py-2 rounded-md text-white' onClick={() => handleAccept(appointment._id)}>Accept</button>
                                        {

                                        }

                                        <button className='bg-red-600 px-4 py-2 rounded-md text-white' onClick={() => handleReject(appointment._id)}>Reject</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (<>No Appintments</>)
            }
        </>
    )
}
