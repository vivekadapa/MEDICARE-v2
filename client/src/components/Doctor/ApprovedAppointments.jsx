import React, { useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import Cookies from 'universal-cookie';

export const ApprovedAppointments = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    const cookies = new Cookies();
    const token = cookies.get('TOKEN');

    return (
        <>
            <h1 className='my-4 text-xl font-semibold'>Approved Appointments</h1>
            {user && user.appointments && user.appointments.length !== 0 ? (
                <div>
                    <ul>
                        {user.appointments
                            .filter((appointment) => appointment.status === 'approved')
                            .map((appointment) => (
                                <li
                                    key={appointment._id}
                                    className='mb-4 p-4 flex flex-col bg-gray-100 gap-2 border rounded shadow-md'
                                >
                                    <div className='flex flex-wrap items-center justify-between'>
                                        <p>Booked On: {new Date(appointment.createdAt).toLocaleString()}</p>
                                        <p className='mb-2 font-semibold'>
                                            Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <p className='mb-2 text-gray-700'>Patient's Name: {appointment.patientName}</p>
                                        <p className='mb-2 text-gray-700'>
                                            {appointment.patientAge},{appointment.patientGender}
                                        </p>
                                    </div>
                                    <div>
                                        Patient's Email: {appointment.user && appointment.user.email}
                                    </div>
                                    <div className='flex flex-wrap justify-between items-center'>
                                        <p className='mb-2 text-gray-700 flex gap-2 items-center'>
                                            Patient's Problem: {appointment.patientProblem}
                                        </p>
                                        <p className='mb-2 text-gray-700 flex gap-2 items-center'> {appointment.doctor.phone}</p>
                                    </div>
                                    <div className='flex flex-wrap gap-4 justify-between items-center'>
                                        <p className='text-sm text-gray-500 px-2 py-2 border-2 shadow-md rounded-md  border-green-400'>
                                            Slot: {appointment.slot.startTime} - {appointment.slot.endTime}
                                        </p>
                                        <div className='flex items-start justify-center gap-4'>
                                            <p
                                                className={`mb-2 text-gray-700 p-2 shadow-md rounded-md ${appointment.status === 'pending'
                                                    ? 'text-yellow-500 border-2 border-yellow-500'
                                                    : appointment.status === 'cancelled'
                                                        ? 'text-red-500  border-2 border-red-500'
                                                        : 'text-green-500 border-2 border-green-500'
                                                    }`}
                                            >
                                                Status: {appointment.status}
                                            </p>
                                        </div>

                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ) : (
                <>No Appointments</>
            )}
        </>
    );
};
