import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import Navigation from '../../../Shared/Navigation/Navigation';
import Footer from '../../../Shared/Footer/Footer';
import { Box } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, authError, signInWIthGoogle } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWIthGoogle(location, history)
    }
    return (
        <Box>
            <Navigation />
            <Container sx={{ mb: 38 }}>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                        <Typography variant="h3" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleLoginSubmit}>
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Email"
                                name="email" onBlur={handleOnChange} variant="standard" />
                            <TextField sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Password" type="password" name="password" onBlur={handleOnChange} variant="standard" />

                            <Button type="submit" sx={{ width: '75%', m: 1 }} variant="contained">Login</Button>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/register">
                                <Button variant="text">NEW USER? PLEASE REGISTER</Button>
                            </NavLink> <br />
                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert severity="success">Login Successful</Alert>}
                            {authError && <Alert severity="error">Please write your email and password correctly</Alert>}
                        </form>
                        <p>----------------------------</p>
                        <Button onClick={handleGoogleSignIn} variant="contained"><GoogleIcon sx={{ mx: 1 }} /> Google sign-in</Button>
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

export default Login;