import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Counter from '../Counter';
import { useAuth } from "../../AuthContext";

export const DoctorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user);
      updateAppointments(user?.appointments);
    }
  }, [user]);

  // State variables for counts
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Function to update counts and earnings
  const updateAppointments = (appointments) => {
    if (appointments) {
      const accepted = appointments.filter(appointment => appointment.status === 'approved').length;
      const pending = appointments.filter(appointment => appointment.status === 'pending').length;
      const rejected = appointments.filter(appointment => appointment.status === 'rejected').length;
      const earnings = appointments.reduce((total, appointment) => total + appointment.ticketPrice, 0);
      setAcceptedCount(accepted);
      setPendingCount(pending);
      setRejectedCount(rejected);
      setTotalEarnings(earnings);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Doctor Dashboard</h1>
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
          <Counter to={acceptedCount} />
          <p className="text-lg font-medium">Accepted Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={pendingCount} />
          <p className="text-lg font-medium">Pending Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={rejectedCount} />
          <p className="text-lg font-medium">Rejected Appointments</p>
        </div>
        <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
          <Counter to={totalEarnings} />
          <p className="text-lg font-medium">Total Earnings</p>
        </div>
      </div>

      {/* <div className="flex my-20">
    
      </div> */}
    </div>
  );
};
