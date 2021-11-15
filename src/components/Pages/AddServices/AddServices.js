import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import './AddServices.css'

const AddServices = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/cars', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('New Car Added Successfully');
                    reset();
                }
            })
    };
    return (
        <Box className="add-service">
            <h2>Add Car Item</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input style={{ display: 'none' }} defaultValue="available" {...register("status")} />
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Car name" />

                <textarea {...register("description")} placeholder="Description" />

                <input type="number" {...register("range", { min: 100, max: 100000 })} placeholder="Range" />

                <input type="number" {...register("price", { min: 100, max: 100000 })} placeholder="Price" />

                <input {...register("img")} placeholder="imageURL" />
                <Button type="submit" variant="contained">Add Car</Button>
            </form>
        </Box>
    );
};

export default AddServices;