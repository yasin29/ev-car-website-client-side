import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Navigation from '../../Shared/Navigation/Navigation';
import img from '../../../images/dp.png'

const style = {
    position: 'sticky',
    width: '80%',
    m: 'auto',
    mt: 1,
    bgcolor: 'lightgray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const MyAccount = () => {
    const { user } = useAuth();
    return (
        <Box>
            <Navigation></Navigation>
            <Container>
                <Box sx={style}>
                    <img style={{ width: '20%' }} src={user.photoURL ? user.photoURL : img} alt="" />
                    <Typography sx={{ width: '90%', m: 1 }} variant="h6" component="h6">
                        <b>Name:</b> {user.displayName}
                    </Typography>
                    <Typography sx={{ width: '90%', m: 1 }} style={{ color: 'darkgoldenrod' }} variant="p" component="p">
                        <b>Email:</b> {user.email}
                    </Typography>
                    <Typography sx={{ width: '90%', m: 1 }} style={{ color: 'darkgoldenrod' }} variant="p" component="p">
                        <b>Email Verification:</b> {user.emailVerified ? <Typography component="span" style={{ display: 'inline' }}>Yes</Typography> : <Typography component="span" style={{ display: 'inline' }}>No</Typography>}
                    </Typography>

                </Box>
            </Container>
        </Box>
    );
};

export default MyAccount;