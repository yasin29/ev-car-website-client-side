import React, { useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManageProducts = () => {
    const [cars, setCars] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [openCancel, setOpenCancel] = React.useState(false);
    const [change, setChange] = useState('');

    const handleClose = e => {
        if (e) {
            setOpen(false);
            const url = `http://localhost:5000/cars/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        setOpenCancel(true);
                        const remaining = cars.filter(service => service._id !== id);
                        setCars(remaining);
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
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => {
                setCars(data)
            })
    }, [change]);

    const handleDelete = id => {
        setOpen(true);
        setId(id);
    }

    const statusChange = (id, status) => {
        const url = `http://localhost:5000/cars/${id}`;
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
                console.log(data.modifiedCount);
                if (data.modifiedCount > 0) {
                    setChange(Math.random());
                }
            })
    }

    const dialogBox = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure to Delete this Car?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Disagree</Button>
                <Button onClick={() => handleClose(true)}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <h2>Manage product</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Car Name</TableCell>
                            <TableCell align="left">Car Details</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Remove Cars</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cars.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left"> <b>Range: </b> {row.range} Miles <br />
                                        <b>Price: </b> {row.price} $
                                    </TableCell>
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
                                                    <MenuItem onClick={() => statusChange(row._id, 'available')} value={'available'}>{row.status === 'available' && <CheckCircleIcon color="success" />} Available</MenuItem>
                                                    <MenuItem onClick={() => statusChange(row._id, 'out_of_stock')} value={'out_of_stock'}>{row.status === 'out_of_stock' && < PendingIcon color="error" />} Out Of Stock</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>

                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleDelete(row._id)} variant="contained" color="error">Remove</Button>
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
                    Car Deleted
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ManageProducts;