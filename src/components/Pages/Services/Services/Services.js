import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Footer from '../../../Shared/Footer/Footer';
import Navigation from '../../../Shared/Navigation/Navigation';
import Service from '../../Service/Service';

const Services = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])
    return (
        <Box>
            <Navigation></Navigation>
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
            </Container>
            <Footer></Footer>
        </Box>
    );
};

export default Services;