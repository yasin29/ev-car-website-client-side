import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import Footer from '../../../Shared/Footer/Footer';
import Navigation from '../../../Shared/Navigation/Navigation';



const Register = () => {
    const [loginData, setLoginData] = useState({});
    const { user, registerUser, isLoading, authError } = useAuth();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        console.log(newLoginData);
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Please Re-type your password')
            return;
        }
        registerUser(loginData.email, loginData.password, history, loginData.name);
        e.preventDefault();
    }
    return (
        <Box>
            <Navigation />
            <Container sx={{ mb: 38 }}>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                        <Typography variant="h3" gutterBottom>
                            Sign Up
                        </Typography>
                        {!isLoading && <form onSubmit={handleLoginSubmit}>
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Name"
                                name="name" onBlur={handleOnBlur}
                                type="text"
                                variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Email"
                                name="email" onBlur={handleOnBlur}
                                type="email"
                                variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Password" type="password" name="password" onBlur={handleOnBlur} variant="standard" />

                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Re-type your Password" type="password" name="password2" onBlur={handleOnBlur} variant="standard" />

                            <Button type="submit" sx={{ width: '75%', m: 1 }} variant="contained">Register</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/login">
                                <Button variant="text">Already Registered? PLEASE LOGIN</Button>
                            </NavLink>
                        </form>}
                        <br />
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">User Created successfully</Alert>}
                        {authError && <Alert severity="error">Please write your email and password correctly.</Alert>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: '100%' }} src="https://i.ibb.co/Xz7LV1M/Electric-Car-Vector-PNG-High-Quality-Image.png" alt="" />
                    </Grid>

                </Grid>
            </Container>
            <Footer></Footer>
        </Box>
    );
};

export default Register;