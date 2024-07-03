import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';


const UserAppointmentHistory = () => {

  const [appointments, setAppointments] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get('TOKEN');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getuserappointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data.user.appointments)
        setAppointments(data.user.appointments); // Set appointments in state
        console.log(appointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
    console.log(appointments);
  }, [token]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">User Appointment History</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} className="mb-4 p-4 flex flex-col bg-gray-100 gap-2 border rounded shadow-md">
            <div className='flex items-center justify-between'>
              <p>Booked On: {new Date(appointment.createdAt).toLocaleString()}</p>
              <p className="mb-2 font-semibold">Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className="mb-2 text-gray-700">Patient's Name: {appointment.patientName}</p>
              <p className="mb-2 text-gray-700">{appointment.patientAge},{appointment.patientGender}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className="mb-2 text-gray-700">Dr. {appointment.doctor.name}</p>
              <p className="mb-2 text-gray-700">Specialization: {appointment.doctor.specialization}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className="mb-2 text-gray-700 flex gap-2 items-center"><FaEnvelope /> {appointment.doctor.email}</p>
              <p className="mb-2 text-gray-700 flex gap-2 items-center"><FaPhoneAlt /> {appointment.doctor.phone}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className="text-sm text-gray-500 px-2 py-2 border-2 shadow-md rounded-md  border-green-400">Slot: {appointment.slot.startTime} - {appointment.slot.endTime}</p>
              <p className={`mb-2 text-gray-700 p-2 shadow-md rounded-md ${appointment.status === 'pending' ? 'text-yellow-500 border-2 border-yellow-500' : appointment.status === 'cancelled' ? 'text-red-500  border-2 border-red-500' : 'text-green-500 border-2 border-green-500'}`}>Status: {appointment.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppointmentHistory;
