import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const { token } = useAuth();
  const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        let usersEndpoint = `${API_ENDPOINT}/user/getAllUsers`;

        if (filterStatus !== 'all') {
          usersEndpoint += `?isActive=${filterStatus}`;
        }

        const response = await fetch(usersEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filterStatus, token]);

  const handleBlock = async (userId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/blockuser/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to block user. Status: ${response.status}`);
      }

      toast.success('User with id  blocked successfully');
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user');
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/unblockuser/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to unblock user. Status: ${response.status}`);
      }

      toast.success('User unblocked successfully');
    } catch (error) {
      console.error('Error unblocking user:', error);
      toast.error('Failed to unblock user');
    }
  };

  const viewUserActivity = (userId) => {
    return `/user-activity/${userId}`;
  };

  return (
    <div className="min-h-screen p-2">
      <h2 className="text-3xl font-bold text-teal-800 mb-4">User Management</h2>

      <label className="text-teal-700 font-semibold ml-4 mr-2">Filter Status:</label>
      <select
        className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500 mb-4"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>

      {error && <p className="text-red-500">Error: {error}</p>}

      <table className="min-w-full border ">
        <thead>
          <tr className="text-justify">
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Consultation</th>
            <th className="py-2 px-4 border-b">Pharma Total</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">View Activity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="bg-white">
              <td className="py-2 px-4 border-b">{user._id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.appointments.length}</td>
              <td className="py-2 px-4 border-b">{user.orders.length}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`inline-block px-3 py-1 text-center text-md font-semibold ${user.isActive === 'active'
                    ? 'bg-green-100 text-green-800 bg-opacity-75'
                    : user.isActive === 'blocked'
                      ? 'bg-red-100 text-red-800 bg-opacity-75'
                      : 'bg-gray-200 text-gray-800 bg-opacity-70'
                    } rounded-full flex items-center`}
                  style={{ width: '80px' }}
                >
                  {user.isActive === 'active' ? 'Active' : user.isActive === 'blocked' ? 'Blocked' : 'Other Status'}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={viewUserActivity(user._id)}>
                  <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                    <FaEye size={20} />
                  </button>
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md mr-2 focus:outline-none"
                  onClick={() => handleBlock(user._id)}
                >
                  Block
                </button>
                <button
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md focus:outline-none"
                  onClick={() => handleUnblock(user._id)}
                >
                  Unblock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
