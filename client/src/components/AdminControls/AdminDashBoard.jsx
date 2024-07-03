import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Counter from '../Counter';
import { BarChartComponent } from './Charts/BarChartComponent';
import { LineChartComponent } from './Charts/LineChartComponent';

import { useAuth } from "../../AuthContext";

const AdminDashboard = () => {
   const [counts, setCounts] = useState({
      pendingDoctorRegistrations: 0,
      pendingHospitals: 0,
      approvedHospitals: 0,
      approvedDoctors: 0,
      deliveredOrders: 0,
      activeUsers: 0,
   });

   const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}`;
   const { token } = useAuth();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const headers = {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            };

            const getResponseData = async (url) => {
               const response = await fetch(url, { headers });
               const data = await response.json();
               return data;
            };

            const pendingHospitalRegistrations = await getResponseData(`${API_ENDPOINT}/hospital/getAllHospitals?isApproved=pending`);
            const pendingDoctorRegistrations = await getResponseData(`${API_ENDPOINT}/doctor/getAlldoctors?isApproved=pending`);
            const activeUsers = await getResponseData(`${API_ENDPOINT}/user/getAllUsers?isActive=active`);
            const approvedHospitals = await getResponseData(`${API_ENDPOINT}/hospital/getAllHospitals?isApproved=approved`);
            const approvedDoctors = await getResponseData(`${API_ENDPOINT}/doctor/getAlldoctors?isApproved=approved`);
            const deliveredOrders = await getResponseData(`${API_ENDPOINT}/admin/getAllOrders?deliveryStatus=true`);

            setCounts({
               pendingDoctorRegistrations: pendingDoctorRegistrations.data?.length || 0,
               pendingHospitals: pendingHospitalRegistrations.data?.length || 0,
               approvedHospitals: approvedHospitals.data?.length || 0,
               approvedDoctors: approvedDoctors.data?.length || 0,
               activeUsers: activeUsers.users?.length || 0,
               deliveredOrders: deliveredOrders.length || 0,

            });
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, [token]);

   return (
      <div className="w-full px-4">
         <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Admin Dashboard</h1>
            <div className="flex items-center py-2.5 gap-2 mx-5">
               <p>Account</p>
               <span>
                  <FaChevronRight className="text-gray-500" />
               </span>
               <p className="text-teal-500 underline">Dashboard</p>
            </div>
         </div>

         <div className="grid md:grid-cols-3 gap-6 grid-cols-1 my-10">
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.pendingDoctorRegistrations} />
               <p className="text-lg font-medium">Pending Doctor Approvals</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.pendingHospitals} />
               <p className="text-lg font-medium">Pending Hospital Approvals</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.approvedHospitals} />
               <p className="text-lg font-medium">Approved Hospitals</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.approvedDoctors} />
               <p className="text-lg font-medium">Approved Doctors</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.deliveredOrders} />
               <p className="text-lg font-medium">Successful Medicine Orders</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={counts.activeUsers} />
               <p className="text-lg font-medium">Active Users</p>
            </div>
         </div>

         <div className="flex my-20">
            <LineChartComponent/>
            <BarChartComponent/>
         </div>
      </div>
   );
};

export default AdminDashboard;
