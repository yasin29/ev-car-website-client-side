import { Alert, Button, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';
import PendingIcon from '@mui/icons-material/Pending';
import Paper from '@mui/material/Paper';
import { yellow } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [change, setChange] = useState('');

    const [open, setOpen] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);

    const [id, setId] = React.useState('');
    const handleClose = e => {
        if (e) {
            setOpen(false);
            const url = `http://localhost:5000/orders/${id}`;
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
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [change]);

    const statusChange = (id, status) => {
        const url = `http://localhost:5000/orders/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'status': `${status}`
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 && status === 'delivered') {
                    alert('Order is Delivered');
                    setChange(Math.random());
                }
                else if (data.modifiedCount > 0) {
                    setChange(Math.random());
                }
            })
    }

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
            <h2>Manage All Orders</h2>
            {
                !orders.length && <CircularProgress />
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Order Details</TableCell>
                            <TableCell align="left">Contact Details</TableCell>
                            <TableCell align="left">Change Status</TableCell>
                            <TableCell align="left">Cancel Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b>Car name: </b>{row.carName} <br /> <b>Price: </b>{row.price} $</TableCell>
                                    <TableCell sx={{ maxWidth: 200 }} align="left"><b>Name:</b> {row.customerName} <br /><b>Email:</b> {row.email} <br /> <b>Mobile:</b> {row.phone} <br /> <b>Address: </b> {row.address} </TableCell>
                                    <TableCell align="left">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={row.status}
                                                    label="Status"
                                                >
                                                    <MenuItem onClick={() => statusChange(row._id, 'pending')} value={'pending'}>{row.status === 'pending' && <PendingIcon sx={{ color: yellow[900] }} />} Pending</MenuItem>
                                                    <MenuItem onClick={() => statusChange(row._id, 'processing')} value={'processing'}>{row.status === 'processing' && < LoopIcon color="primary" />} Shipped</MenuItem>
                                                    <MenuItem onClick={() => statusChange(row._id, 'delivered')} value={'delivered'}> {row.status === 'delivered' && <CheckCircleIcon color="success" />} Delivered</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleDelete(row._id)} variant="contained" color="error">Delete/Cancel Order</Button>
                                    </TableCell>

                                </TableRow>
                            ))
                        }

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

export default AllOrders;