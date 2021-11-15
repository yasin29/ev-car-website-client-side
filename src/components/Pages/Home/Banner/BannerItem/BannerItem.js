import { Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const BannerItem = ({ name, description, img }) => {





    const theme = useTheme();
    const useStyle = makeStyles({
        smallImage: {
            [theme.breakpoints.up('md')]: {
                marginLeft: '-100px',
                borderRadius: '10px'
            }
        },
        verticleCenter: {
            [theme.breakpoints.up('md')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 500,
                background: 'rgba(184, 117, 135, 0.8)'

            }
        },
        carousolBg: {
            [theme.breakpoints.up('sm')]: {
                background: 'url(https://images.unsplash.com/photo-1574023240744-64c47c8c0676?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwZGVhbGVyc2hpcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 500px'
            },
            [theme.breakpoints.down('sm')]: {
                background: 'url(https://images.unsplash.com/photo-1574023240744-64c47c8c0676?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwZGVhbGVyc2hpcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 300px'
            }
        }
    })

    const { smallImage, verticleCenter, carousolBg } = useStyle();


    return (
        <Container style={{ paddingRight: '0px', paddingLeft: '0px' }} maxWidth="xl" className={carousolBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(58, 39, 44, 0.8)'
                }} xs={12} sm={12} md={6}>
                    <Typography sx={{ pt: 3, color: 'white' }} variant="h3">
                        {name}
                    </Typography>
                    <Typography variant="h4" sx={{ background: 'rgba(178, 168, 168, .8)', p: 1, my: 3, fontSize: 18, color: 'DarkGreen ', fontWeight: '700', borderRadius: '10px' }}>
                        Range: {description}
                    </Typography>
                    <Link to="/services" style={{ textDecoration: 'none' }}>
                        <Button style={{ backgroundColor: '#53B076' }} variant="contained">Explore EVs</Button>
                    </Link>

                </Grid>
                <Grid item xs={12} sm={12} md={6} className={verticleCenter}>
                    <img className={smallImage} style={{ width: '100%' }} src={img} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default BannerItem;