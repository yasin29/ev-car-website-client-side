import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import './Service.css'

const Service = ({ car }) => {
    const { name, description, range, price, img, _id, status } = car;
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper id="cardHover" elevation={3} sx={{ py: 5 }}>
                <img sx={{ display: 'block', mx: 'auto' }} style={{ height: '200px', width: '85%' }} src={img} alt="" />
                <Box style={{ height: '260px', padding: '20px' }}>
                    <Typography sx={{ color: 'info.main', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                        {name}
                    </Typography>
                    <Typography variant="p" gutterBottom component="div">
                        {description.slice(0, 70)}...
                    </Typography>
                    <Typography sx={{ color: 'darkgreen' }} variant="h6" display="block" gutterBottom>
                        Range: {range} Miles
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        Price: {price} $
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        {(status === 'available') ? <Box style={{ color: 'green' }}>Available</Box> : <Box style={{ color: 'red' }}>Out of Stock</Box>}
                    </Typography>

                    <Link style={{ textDecoration: 'none' }} to={`/orders/${_id}`}>
                        <Button variant="contained">Buy Now</Button>
                    </Link>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Service;