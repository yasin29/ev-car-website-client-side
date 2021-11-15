import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [openCancel, setOpenCancel] = React.useState(false);
    const { user } = useAuth();

    const handleClose = e => {
        if (e) {
            setOpen(false);
            const url = `https://dry-stream-77696.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        setOpenCancel(true);
                        const remaining = orders.filter(booking => booking._id !== id);
                        setOrders(remaining);
                    }

                })
        }
        else {
            setOpen(false);
        }

    };

    const handleCloseCancel = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenCancel(false);
    };

    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    const handleDelete = id => {
        setOpen(true);
        setId(id);
    }

    const dialogBox = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure to Cancel/Delete this Order?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Disagree</Button>
                <Button onClick={() => handleClose(true)}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <h2>My Orders</h2>
            <TableContainer component={Paper}>
                {
                    !orders.length && <CircularProgress />
                }
                <Table sx={{ minWidth: 650 }} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Order Details</TableCell>
                            <TableCell align="left">Contact Details</TableCell>
                            <TableCell align="left">Order Status</TableCell>
                            <TableCell align="left">Cancel Order</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {orders.map((row) => (((user.email === row.email) || (user.displayName === row.name)) &&
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left"><b>Car name: </b>{row.carName} <br /> <b>Price: </b>{row.price} $</TableCell>
                                <TableCell sx={{ maxWidth: 200 }} align="left"><b>Name:</b> {row.customerName} <br /><b>Email:</b> {row.email} <br /> <b>Mobile:</b> {row.phone} <br /> <b>Address: </b> {row.address} </TableCell>
                                <TableCell align="left">
                                    {
                                        (row.status === "delivered") ?
                                            <Typography sx={{ backgroundColor: 'green', p: 2, borderRadius: '5px', color: 'white' }} variant="text">Delivered</Typography> :
                                            (row.status === "processing") ? <Typography sx={{ backgroundColor: 'skyblue', p: 2, borderRadius: '5px' }} variant="text">Shipped</Typography> :
                                                <Typography sx={{ backgroundColor: 'yellow', p: 2, borderRadius: '5px' }} variant="text">Pending</Typography>
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleDelete(row._id)} variant="contained" color="error">Cancel Order</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                {dialogBox}
            </div>
            <Snackbar open={openCancel} autoHideDuration={5000} onClose={handleCloseCancel}>
                <Alert onClose={handleCloseCancel} severity="error" sx={{ width: '100%' }}>
                    Order Canceled
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Orders;