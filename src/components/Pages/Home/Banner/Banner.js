import { Container } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import BannerItem from './BannerItem/BannerItem';

const Banner = () => {
    const items = [
        {
            name: 'Tesla Model 3',
            description: '353 miles',
            img: "https://i.ibb.co/0sh2SPj/4.jpg"
        },
        {
            name: 'BMW i3',
            description: '153 miles',
            img: 'https://i.ibb.co/3sf2rSG/10.jpg'
        },
        {
            name: 'Audi E-Tron',
            description: '222 miles',
            img: 'https://i.ibb.co/2ZzwgWF/1.jpg'
        },
    ];
    return (
        <Container maxWidth="xl">
            <Carousel
                navButtonsAlwaysVisible={true}
                interval={1500}
                IndicatorIcon={false}
                navButtonsProps={{
                    style: {
                        backgroundColor: "white",
                        opacity: '.8',
                        fill: 'black'
                    }
                }}
                navButtonsWrapperProps={{
                    style: {
                        height: '89%',
                        padding: '50px',

                    }
                }}


            >
                {items.map((item, i) => (
                    <BannerItem key={i} {...item} />
                ))}
            </Carousel>
        </Container >
    );
};

export default Banner;