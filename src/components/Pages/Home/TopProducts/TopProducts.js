import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../../Service/Service';

const TopProducts = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data.slice(0, 6)))
    }, [])
    return (
        <Container>
            <Typography variant="h2" sx={{ color: 'info.main', mb: 2 }}>Discover Electric Car</Typography>
            {
                !cars.length && <CircularProgress />
            }
            <Grid container spacing={2}>
                {
                    cars.map(car => <Service
                        key={car._id}
                        car={car}
                    ></Service>)
                }
            </Grid>
            <Link style={{ textDecoration: 'none' }} to="/services">
                <Button sx={{ my: 5, fontSize: '130%' }} variant="text">See More Electric Vehicles</Button>
            </Link>
        </Container>
    );
};

export default TopProducts;