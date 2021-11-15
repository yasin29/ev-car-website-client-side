import { Alert, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import Paper from '@mui/material/Paper';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setAdmins(data))
    }, [success])

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email }
        fetch('https://dry-stream-77696.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    setInvalid(false);
                }
                else {
                    setInvalid(true);
                    setSuccess(false);
                }
            })
        e.preventDefault()
    }
    return (
        <div>
            <h2>Make an admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField sx={{ width: '50%' }} type="email" onBlur={handleOnBlur} id="standard-basic" label="Email" variant="standard" />
                <Button variant="contained" type="submit">Make Admin</Button>
            </form>
            <br />
            {success && <Alert severity="success">Admin Added Successfully</Alert>}
            {invalid && <Alert severity="error">Invalid Email Address or Admin Already Exists</Alert>}
            <Box sx={{ p: 5 }}>
                <Typography variant="h4">
                    Admin List
                </Typography>
                <TableContainer component={Paper}>
                    {
                        !admins.length && <CircularProgress />
                    }
                    <Table sx={{ minWidth: 650 }} aria-label="Appointments table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Admin Name</TableCell>
                                <TableCell align="left">Email Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((row) => ((row.role === 'admin') &&
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.displayName}</TableCell>
                                    <TableCell align="left"> {row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default MakeAdmin;