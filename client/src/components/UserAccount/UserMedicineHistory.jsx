import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Cookies from 'universal-cookie'
import swal from 'sweetalert2'
import axios from 'axios'


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const cookies = new Cookies();

  const cancelOrder = (id) => {
    swal.fire({
      title: "Are you sure want to cancel the Order?",
      text: "Refer to our cancellation policy for futher Info",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'close',
      confirmButtonText: 'Cancel Order'
    })
      .then(async willCancel => {
        if (willCancel.isConfirmed) {
          try {
            const response = await axios.request({
              headers: {
                Authorization: `Bearer ${cookies.get("TOKEN")}`
              },
              url: `${import.meta.env.VITE_API_BASE_URL}/user/cancelOrder/${id}`,
              method: 'put'
            })
            if (response.data.success) {
              swal.fire({
                title: "Done!",
                text: "Order Cancelled",
                icon: "success",
                timer: 2000,
                button: false
              })
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
  }

  return (

    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderDate.split('T')[0]}
        </TableCell>
        <TableCell align="right">
          {row._id}
        </TableCell>
        <TableCell align="right">{row.medicines.length}</TableCell>
        <TableCell align="right">{row.totalAmount}</TableCell>
        <TableCell align="right">{
          row.deliveryStatus ? (
            <p className='text-green-700'>Order Delivered</p>
          ) : (<p className='text-red-600'>Yet to be Delivered</p>)
        }</TableCell>
        <TableCell align="right">{
          row.cancelOrder ? (
            <p className=''>Order Cancelled</p>
          ) : (
            <button className='bg-red-500 w-fit float-right px-4 py-2 text-white rounded' onClick={() => {
              cancelOrder(row._id)
            }}>Cancel Order</button>
          )
        }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
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
                  {row.medicines.map((historyRow) => (
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
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function UserMedicineHistory() {

  const [medicineHistory, setMedicineHistory] = React.useState([]);
  const cookies = new Cookies();

  React.useEffect(() => {
    const fetchMedicineHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getmedicinehistory`, {
          headers: {
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userOrders = data.user?.orders || [];
          setMedicineHistory(userOrders);
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching medicine history:', error);
      }
    };

    fetchMedicineHistory();
    console.log(medicineHistory)
  }, [medicineHistory]);

  return (
    <>
      <TableContainer component={Paper}>
        <h1 className='text-center text-2xl text-black my-4'>Order History</h1>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Date</TableCell>
              <TableCell align='right'>Order Id</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Amount&nbsp;(Rs)</TableCell>
              <TableCell align="right">Delivery Status&nbsp;</TableCell>
              <TableCell align="right">Cancel Order&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicineHistory.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
