// import { useState, useEffect } from 'react';
// import { useAuth } from "../../AuthContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';

// const MedicineDeliveryStatus = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [deliveredFilter, setDeliveredFilter] = useState(null);
//   const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         let ordersEndpoint = `${API_ENDPOINT}/admin/getAllOrders`;

//         if (deliveredFilter !== null) {
//           ordersEndpoint += `?deliveryStatus=${deliveredFilter === 'undelivered' ? false : true}`;
//         }

//         const response = await fetch(ordersEndpoint, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch orders. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setOrders(data);
//         console.log('Orders fetched successfully:', data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [deliveredFilter, token]);

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) {
//       return "Invalid Date";
//     }

//     const date = new Date(timestamp);

//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }

//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     const formattedDate = date.toLocaleDateString(undefined, options);
//     return formattedDate;
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       const response = await axios.put(`${API_ENDPOINT}/user/cancelOrder/${orderId}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         const updatedOrders = orders.map(order => {
//           if (order._id === orderId) {
//             return { ...order, cancelOrder: true };
//           }
//           return order;
//         });
//         setOrders(updatedOrders);
//         toast.success('Order Cancelled Successfully');
//       } else {
//         throw new Error(response.data.message || 'Failed to cancel order');
//       }
//     } catch (error) {
//       console.error('Error cancelling order:', error);
//       toast.error('Failed to cancel order');
//     }
//   };

//   const markDelivered = async (orderId) => {
//     try {
//       const response = await fetch(`${API_ENDPOINT}/admin/updateDeliveryStatus/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}),
//       });

//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Failed to update delivery status. Status: ${response.status}`);
//       }

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, deliveryStatus: true } : order
//         )
//       );

//       toast.success('Delivery status updated successfully');
//     } catch (error) {
//       console.error('Error updating delivery status:', error);
//       toast.error('Failed to update delivery status');
//     }
//   };


//   return (
//     <div className="min-h-screen p-2">
//       <h2 className="text-3xl font-bold text-teal-800 mb-4">Medicine Delivery Status</h2>

//       <div className="flex items-center mb-4 space-x-4">
//         <div className="flex items-center">
//           <label className="text-teal-700 font-semibold ml-4 mr-2">Filter Status:</label>
//           <select
//             className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500"
//             value={deliveredFilter !== null ? deliveredFilter.toString() : 'all'}
//             onChange={(e) => setDeliveredFilter(e.target.value !== 'all' ? e.target.value : null)}
//           >
//             <option value="all">All</option>
//             <option value="undelivered">Yet to Deliver</option>
//             <option value="delivered">Delivered</option>
//           </select>
//         </div>
//       </div>

//       {loading && <p className="text-teal-700">Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <table className="min-w-full border ">
//         <thead>
//           <tr className="text-justify">
//             <th className="py-2 px-4 border-b">Order ID</th>
//             <th className="py-2 px-4 border-b">User ID</th>
//             <th className="py-2 px-4 border-b">Medicines</th>
//             <th className="py-2 px-4 border-b">Total Amount</th>
//             <th className="py-2 px-4 border-b">Delivery Status</th>
//             <th className="py-2 px-4 border-b">Order Date</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id} className="bg-white">
//               <td className="py-2 px-4 border-b">{order._id}</td>
//               <td className="py-2 px-4 border-b">{order.userId}</td>
//               <td className="py-2 px-4 border-b">
//                 <ul>
//                   {order.medicines.map((medicine, index) => (
//                     <li key={index}>{medicine.medicineName}</li>
//                   ))}
//                 </ul>
//               </td>
//               <td className="py-2 px-4 border-b">₹{order.totalAmount}</td>
//               <td className="py-1 px-2 border-b">
//                 <p
//                   className={`p-2 flex items-center justify-center text-center text-sm font-semibold ${order.cancelOrder
//                     ? 'bg-orange-300 text-orange-800 bg-opacity-75'
//                     : order.deliveryStatus
//                       ? 'bg-green-100 text-green-800 bg-opacity-75'
//                       : 'bg-red-100 text-red-800 bg-opacity-75'
//                     } rounded-full flex items-center`}
//                 >
//                   {order.cancelOrder ? 'Order Cancelled' : order.deliveryStatus ? 'Delivered' : 'Not Delivered'}
//                 </p>
//               </td>
//               <td className="py-2 px-4 border-b">{formatTimestamp(order.orderDate)}</td>
//               <td className="px2 py-1 border-b">
//                 <button
//                   className={`text-white ${order.deliveryStatus || order.cancelOrder ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
//                     } px-2 py-2 rounded-md focus:outline-none text-sm`}
//                   onClick={() => markDelivered(order._id, order.cancelOrder, order.deliveryStatus)}
//                   disabled={order.deliveryStatus || order.cancelOrder}
//                 >
//                   Mark Delivered
//                 </button>
//                 <button
//                   className={`text-white ${order.cancelOrder ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
//                     } px-4 py-2 rounded-md focus:outline-none text-sm ml-2`}
//                   onClick={() => !order.cancelOrder && cancelOrder(order._id)}
//                   disabled={order.cancelOrder}
//                 >
//                   Cancel Order
//                 </button>
//               </td>


//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MedicineDeliveryStatus;



import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

const MedicineDeliveryStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveredFilter, setDeliveredFilter] = useState(null);
  const [openMedicines, setOpenMedicines] = useState(null);
  const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        let ordersEndpoint = `${API_ENDPOINT}/admin/getAllOrders`;

        if (deliveredFilter !== null) {
          ordersEndpoint += `?deliveryStatus=${deliveredFilter === 'undelivered' ? false : true}`;
        }

        const response = await fetch(ordersEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
        console.log('Orders fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [deliveredFilter, token]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Invalid Date";
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`${API_ENDPOINT}/user/cancelOrder/${orderId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const updatedOrders = orders.map(order => {
          if (order._id === orderId) {
            return { ...order, cancelOrder: true };
          }
          return order;
        });
        setOrders(updatedOrders);
        toast.success('Order Cancelled Successfully');
      } else {
        throw new Error(response.data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const markDelivered = async (orderId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/updateDeliveryStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to update delivery status. Status: ${response.status}`);
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: true } : order
        )
      );

      toast.success('Delivery status updated successfully');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Failed to update delivery status');
    }
  };

  return (
    <div className="min-h-screen p-2">
      <h2 className="text-3xl font-bold text-teal-800 mb-4">Medicine Delivery Status</h2>

      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center">
          <label className="text-teal-700 font-semibold ml-4 mr-2">Filter Status:</label>
          <select
            className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500"
            value={deliveredFilter !== null ? deliveredFilter.toString() : 'all'}
            onChange={(e) => setDeliveredFilter(e.target.value !== 'all' ? e.target.value : null)}
          >
            <option value="all">All</option>
            <option value="undelivered">Yet to Deliver</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-teal-700">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow className="bg-white">
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpenMedicines((prevOpen) => (prevOpen === order._id ? null : order._id))}
                    >
                      {openMedicines === order._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <p className={`p-2 flex items-center justify-center text-center text-sm font-semibold ${order.cancelOrder
                      ? 'bg-orange-300 text-orange-800 bg-opacity-75'
                      : order.deliveryStatus
                        ? 'bg-green-100 text-green-800 bg-opacity-75'
                        : 'bg-red-100 text-red-800 bg-opacity-75'
                      } rounded-full flex items-center`}
                    >
                      {order.cancelOrder ? 'Order Cancelled' : order.deliveryStatus ? 'Delivered' : 'Not Delivered'}
                    </p>
                  </TableCell>
                  <TableCell>{formatTimestamp(order.orderDate)}</TableCell>
                  <TableCell>
                    <button
                      className={`text-white ${order.deliveryStatus || order.cancelOrder ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        } px-2 py-2 rounded-md focus:outline-none text-sm`}
                      onClick={() => markDelivered(order._id, order.cancelOrder, order.deliveryStatus)}
                      disabled={order.deliveryStatus || order.cancelOrder}
                    >
                      Mark Delivered
                    </button>
                    <button
                      className={`text-white ${order.cancelOrder ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                        } px-4 py-2 rounded-md focus:outline-none text-sm ml-2`}
                      onClick={() => !order.cancelOrder && cancelOrder(order._id)}
                      disabled={order.cancelOrder}
                    >
                      Cancel Order
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={openMedicines === order._id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <p className='font-semibold'>Medicine Name</p>
                              </TableCell>
                              <TableCell align="right">
                                <p className='font-semibold'>Medicine Type</p>
                              </TableCell>
                              <TableCell align="right">
                                <p className='font-semibold'>Amount</p>
                              </TableCell>
                              <TableCell align="right">
                                <p className='font-semibold'>Quantity</p>
                              </TableCell>
                              <TableCell align="right">
                                <p className='font-semibold'>Total Price (Rs)</p>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.medicines.map((historyRow) => (
                              <TableRow key={historyRow.medicineId}>
                                <TableCell component="th" scope="row">
                                  {historyRow.medicineName}
                                </TableCell>
                                <TableCell align="right">{historyRow.medicineType}</TableCell>
                                <TableCell align="right">{historyRow.MRP}</TableCell>
                                <TableCell align="right">{historyRow.quantity}</TableCell>
                                <TableCell align="right">
                                  {historyRow.MRP * historyRow.quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MedicineDeliveryStatus;


