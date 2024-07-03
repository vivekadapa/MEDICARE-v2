import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Counter from '../Counter';
import { useAuth } from "../../AuthContext";

export const UserDashBoard = () => {

  const { user, token } = useAuth();

  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(0);

  useEffect(() => {
    if (user && user.appointments) {
      // Filter appointments based on their status
      const pending = user.appointments.filter(appointment => appointment.status === 'pending');
      const approved = user.appointments.filter(appointment => appointment.status === 'approved');
      const rejected = user.appointments.filter(appointment => appointment.status === 'cancelled');

      setPendingAppointments(pending);
      setApprovedAppointments(approved);
      setRejectedAppointments(rejected);
      setNumberOfOrders(user.orders ? user.orders.length : 0);
    }
  }, [user]);


  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">User Dashboard</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Account</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-teal-500 underline">Dashboard</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 grid-cols-1 my-10">
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={pendingAppointments.length} />
          <p className="text-lg font-medium">Pending Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={approvedAppointments.length} />
          <p className="text-lg font-medium">Approved Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={rejectedAppointments.length} />
          <p className="text-lg font-medium">Rejected Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={numberOfOrders} />
          <p className="text-lg font-medium">Number of Orders</p>
        </div>
      </div>

      <div className="flex my-20">

      </div>
    </div>
  );
};

