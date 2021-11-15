import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, CircularProgress, Container, Rating } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from "../../../../images/dp.png"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

const TopReviews = () => {
    const [reviews, setReviews] = useState([]);
    const shareUrl = 'http://localhost:5000';

    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    let settings = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 750,
            settings: {
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 1000,
            settings: {
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 2,
                slidesToScroll: 2,

            }
        }]
    };
    return (
        <Container>
            <h2>Our Customer Reviews</h2>
            {
                !reviews.length && <CircularProgress />
            }
            <Slider
                {...settings}
                className="m-5"
            >
                {
                    reviews.map(review =>
                        <Card key={review._id} sx={{ maxWidth: 345, borderRadius: "10%" }}>
                            <CardActionArea sx={{ p: 1 }}>
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {
                                        review.img ? <img style={{ height: '100px', borderRadius: '50%', border: '1px solid blue' }} src={review.img} alt={review.customerName} /> : <img style={{ borderRadius: '50%', height: '100px', border: '1px solid blue' }} src={img} alt={review.customerName} />
                                    }
                                </div>
                                <CardContent style={{ height: '180px' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {review.customerName}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Product Purchased: {review.carName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.review}
                                    </Typography>
                                    <Rating name="read-only" value={review.rating} readOnly />
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Typography sx={{ color: 'blue', px: 2 }} variant="overline">Share</Typography>
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={review.carName}
                                    hashtag="#programing joke">
                                    <FacebookIcon style={{ borderRadius: '50%', width: 'auto', height: '30px' }} color="white" />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={shareUrl}
                                    quote={review.carName}
                                    hashtag="#electro_boom">
                                    <TwitterIcon style={{ borderRadius: '50%', width: 'auto', height: '30px' }} color="white" />
                                </TwitterShareButton>
                                <WhatsappShareButton
                                    url={shareUrl}
                                    quote={review.carName}
                                    hashtag="#electro_boom">
                                    <WhatsappIcon style={{ borderRadius: '50%', width: 'auto', height: '30px' }} color="white" />
                                </WhatsappShareButton>
                            </CardActions>
                        </Card>
                    )
                }
            </Slider >
        </Container >
    );
};

export default TopReviews;