import { Button, Container, FormControl, InputLabel, MenuItem, Rating, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';

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

const AddReviews = () => {
    const [carId, setCarId] = useState('');
    const [car, setCar] = useState({});
    const { user } = useAuth();
    const initialInfo = { customerName: user.displayName, email: user.email }
    const [reviewInfo, setReviewInfo] = useState(initialInfo);
    const { name } = car;
    const [rating, setRating] = React.useState(2);
    console.log(rating);

    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetch('https://dry-stream-77696.herokuapp.com/cars')
            .then(res => res.json())
            .then(data => setCars(data))
    }, [])

    useEffect(() => {
        fetch(`https://dry-stream-77696.herokuapp.com/cars/${carId}`)
            .then(res => res.json())
            .then(data => setCar(data))
    }, [carId])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...reviewInfo };
        newInfo[field] = value;
        setReviewInfo(newInfo);
    }

    const handleReviewSubmit = e => {
        const review = {
            ...reviewInfo,
            carName: name,
            rating: rating,
            img: user.photoURL
        }
        fetch('https://dry-stream-77696.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Review Posted!');
                }
            })
        e.preventDefault();
    }

    const carChange = id => {
        setCarId(id);
    }
    return (
        <div>
            <h2>Add Your Review</h2>
            <Container>
                <Box sx={style}>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Car To Review</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={carId}
                                label="Select Car To Review"
                            >
                                {
                                    cars.map(row =>
                                        <MenuItem key={row._id} onClick={() => carChange(row._id)} value={row._id}>{row.name}</MenuItem>
                                    )}
                            </Select>

                        </FormControl>
                    </Box>
                    <Typography variant="h3" component="h3">
                        {name}
                    </Typography>
                    <form onSubmit={handleReviewSubmit}>
                        <TextField
                            required
                            sx={{ width: '90%', m: 1 }}
                            label="Name"
                            id="outlined-size-small"
                            name="customerName"
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            size="small"
                            placeholder="your full name"
                        />
                        <TextField
                            required
                            sx={{ width: '90%', m: 1 }}
                            label="Email"
                            id="outlined-size-small"
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            size="small"
                            placeholder="your email address"
                        />
                        <Typography component="legend">RATE THE PRODUCT </Typography>
                        <Rating
                            required
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />

                        <TextField
                            required
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-multiline-static"
                            label="Your Review"
                            name="review"
                            onBlur={handleOnBlur}
                            multiline
                            rows={4}
                            placeholder="Write your review"
                            defaultValue=""
                        />

                        <br />
                        <Button type="submit" variant="contained">Post Review</Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AddReviews;