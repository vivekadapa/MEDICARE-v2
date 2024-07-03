import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';



const AdminVerification = () => {
  const [newHospitals, setNewHospitals] = useState([]);
  const [newDoctors, setNewDoctors] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');


  const { token } = useAuth();
  const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}`;

  useEffect(() => {
    let endpoint = '';

    if (filterType === 'all') {
      const hospitalsEndpoint = `${API_ENDPOINT}/hospital/getAllHospitals`;
      const doctorsEndpoint = `${API_ENDPOINT}/doctor/getalldoctors`;

      Promise.all([
        fetch(hospitalsEndpoint).then(response => response.json()),
        fetch(doctorsEndpoint).then(response => response.json()),
        console.log(doctorsEndpoint)
      ])
        .then(([hospitalsData, doctorsData]) => {
          console.log('Hospitals data:', hospitalsData);
          console.log('Doctors data:', doctorsData);

          // Update the state based on the response
          setNewHospitals(hospitalsData.data.filter(hospital => filterStatus === 'all' || hospital.isApproved === filterStatus));
          setNewDoctors(doctorsData.data.filter(doctor => filterStatus === 'all' || doctor.isApproved === filterStatus));
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      let statusFilter = '';

      if (filterStatus !== 'all' && filterStatus !== 'pending') {
        statusFilter = `&isApproved=${filterStatus}`;
      }

      endpoint = filterType === 'hospitals'
        ? `${API_ENDPOINT}/hospital/getAllHospitals?${statusFilter}`
        : `${API_ENDPOINT}/doctor/getalldoctors?${statusFilter}`;

      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          console.log('Filtered Data:', data);

          // Update the state based on the response
          setNewHospitals(filterType === 'hospitals' ? data.data : []);
          setNewDoctors(filterType === 'doctors' ? data.data : []);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [filterStatus, filterType]);

  const handleApproval = async (entityType, id) => {
    try {
      if (!token) {
        console.error('Authorization token is missing or invalid.');
        return;
      }

      let endpoint = '';
      if (entityType === 'doctor') {

        endpoint = `${API_ENDPOINT}/admin/approvedoctor/${id}`;

      } else if (entityType === 'hospital') {
        endpoint = `${API_ENDPOINT}/admin/approvehospital/${id}`;

      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Failed to approve ${entityType} with id ${id}. Server returned ${response.status}: ${await response.text()}`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Update the state based on the approved data
        if (entityType === 'hospital') {
          setNewHospitals((prevHospitals) =>
            prevHospitals.map((hospital) =>
              hospital._id === id ? { ...hospital, isApproved: 'approved' } : hospital
            )
          );
        } else if (entityType === 'doctor') {
          setNewDoctors((prevDoctors) =>
            prevDoctors.map((doctor) =>
              doctor._id === id ? { ...doctor, isApproved: 'approved' } : doctor
            )
          );
        }

        // Show toast message
        toast.success(`Successfully approved ${entityType} with id ${id}`);
      } else {
        console.error(`Failed to approve ${entityType} with id ${id}: ${data.message}`);
      }
    } catch (error) {
      console.error(`Error approving ${entityType} with id ${id}: ${error.message}`);
    }
  };

  const handleRejection = async (entityType, id) => {
    try {
      if (!token) {
        console.error('Authorization token is missing or invalid.');
        return;
      }

      let endpoint = '';
      if (entityType === 'doctor') {
        endpoint = `${API_ENDPOINT}/admin/canceldoctor/${id}`;
      } else if (entityType === 'hospital') {
        endpoint = `${API_ENDPOINT}/admin/cancelhospital/${id}`;
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Failed to reject ${entityType} with id ${id}. Server returned ${response.status}: ${await response.text()}`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Update the state based on the rejected data
        if (entityType === 'hospital') {
          setNewHospitals((prevHospitals) =>
            prevHospitals.map((hospital) =>
              hospital._id === id ? { ...hospital, isApproved: 'cancelled' } : hospital
            )
          );
        } else if (entityType === 'doctor') {
          setNewDoctors((prevDoctors) =>
            prevDoctors.map((doctor) =>
              doctor._id === id ? { ...doctor, isApproved: 'cancelled' } : doctor
            )
          );
        }

        toast.success(`Successfully rejected ${entityType} with id ${id}`);
      } else {
        console.error(`Failed to reject ${entityType} with id ${id}: ${data.message}`);
      }
    } catch (error) {
      console.error(`Error rejecting ${entityType} with id ${id}: ${error.message}`);
    }
  };

  const viewDoctorActivity = (docId) => {
    return `/doctor-activity/${docId}`;
  };

  const viewHospitalActivity = (hospId) => {
    return `/hospital-activity/${hospId}`;
  };

  return (
    <div className="min-h-screen p-2">

      <div className="flex">
        <h2 className="text-3xl font-bold text-teal-800 mb-6 ">Admin Verification Panel</h2>

        <div className="flex items-center mb-4 space-x-4 ml-64">
          <div className="flex items-center">
            <label className="text-teal-700 font-semibold mr-2">Filter by:</label>
            <select
              className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="doctors">Doctors</option>
              <option value="hospitals">Hospitals</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="text-teal-700 font-semibold ml-4 mr-2">Filter Status:</label>
            <select
              className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Rejected</option>
            </select>
          </div>
        </div>

      </div>


      <div className="mb-8">
        <table className="min-w-full bg-white border border-teal-400 ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-start">ID</th>
              <th className="py-2 px-4 border-b text-start">Name</th>
              <th className="py-2 px-4 border-b text-start">Type</th>
              <th className="py-2 px-4 border-b">View Activity</th>
              <th className="py-2 px-4 border-b text-start">Status</th>
              <th className="py-2 px-4 border-b text-start">Actions</th>
            </tr>
          </thead>
          <tbody >
            {newHospitals.map((hospital) => (
              <tr key={hospital._id}>
                <td className=" py-2 px-4 border-b">{hospital._id}</td>
                <td className=" py-2 px-4 border-b">{hospital.name}</td>
                <td className=" py-2 px-4 border-b">Hospital</td>
                <td className="py-2 px-4 border-b">

                  <Link to={viewHospitalActivity(hospital._id)}>
                    <button className="text-gray-600 hover:text-gray-900 focus:outline-none ml-20">
                      <FaEye size={20} />
                    </button>
                  </Link>
                </td>

                <td className=" py-2 px-4 border-b">

                  <span className={`inline-flex items-center px-3 py-0.5 text-md font-medium ${hospital.isApproved === 'approved' ? 'bg-green-100 text-green-800' :
                    hospital.isApproved === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    } rounded-full`}>
                    {hospital.isApproved === 'approved' ? 'Approved' :
                      hospital.isApproved === 'cancelled' ? 'Rejected' :
                        'Pending'}
                  </span>
                </td>

          

                <td className="py-2 px-4 border-b ml-10">
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md mr-2 focus:outline-none"
                    onClick={() => handleApproval('hospital', hospital._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none"
                    onClick={() => handleRejection('hospital', hospital._id)}
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}
            {newDoctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="py-2 px-4 border-b">{doctor._id}</td>
                <td className="py-2 px-4 border-b">{doctor.name}</td>
                <td className="py-2 px-4 border-b">Doctor</td>

                <td className="py-2 px-4 border-b">
                  <Link to={viewDoctorActivity(doctor._id)}>
                    <button className="text-gray-600 hover:text-gray-900 focus:outline-none ml-20">
                      <FaEye size={20} />
                    </button>
                  </Link>
                </td>

                <td className="py-2 px-4 border-b">
                  <span className={`inline-flex items-center px-3 py-0.5 text-md font-medium ${doctor.isApproved === 'approved' ? 'bg-green-100 text-green-800' :
                    doctor.isApproved === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    } rounded-full`}>
                    {doctor.isApproved === 'approved' ? 'Approved' :
                      doctor.isApproved === 'cancelled' ? 'Rejected' :
                        'Pending'}
                  </span>
                </td>

              
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md mr-2 focus:outline-none"
                    onClick={() => handleApproval('doctor', doctor._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none"
                    onClick={() => handleRejection('doctor', doctor._id)}
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerification;
