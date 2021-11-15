import { Button, Container, Dialog, DialogActions, DialogTitle, Grid, Input, InputLabel, Slide, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import Navigation from '../../../Shared/Navigation/Navigation';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import Footer from '../../../Shared/Footer/Footer'
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

const phoneCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(+880) 000-0000000"
            definitions={{
                '#': /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

phoneCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Book = () => {
    const [values, setValues] = React.useState({
        phone: '(+880)'
    });
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleClose = e => {
        setOpen(e)
    }

    const [open, setOpen] = React.useState(false);
    const dialogBox = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Order Placed Successfully"}</DialogTitle>
            <DialogActions>
                <Link to="/services">
                    <Button>Explore</Button>
                </Link>
            </DialogActions>
        </Dialog>
    )


    const { carId } = useParams();
    const [car, setCar] = useState({});
    const { user } = useAuth();
    const initialInfo = { customerName: user.displayName, email: user.email, phone: '' }
    const [orderInfo, setOrderInfo] = useState(initialInfo);
    const { name, description, range, price, img } = car;
    useEffect(() => {
        fetch(`http://localhost:5000/cars/${carId}`)
            .then(res => res.json())
            .then(data => setCar(data))
    }, [carId])

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...orderInfo };
        newInfo[field] = value;
        setOrderInfo(newInfo);
    }

    const handleOrderSubmit = e => {

        const order = {
            ...orderInfo,
            carName: name,
            description: description,
            range: range,
            price: price,
            status: 'pending'
        }
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setOpen(true);
                }
            })
        e.preventDefault();
    }

    return (
        <Box>
            <Navigation></Navigation>
            <Typography variant="h3">
                <b> Purchase Car</b>
            </Typography>
            <Container sx={{ flexGrow: 1 }}>
                <Grid sx={style} container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="h4">
                            <b> Car Details</b>
                        </Typography>
                        <img style={{ width: '80%' }} src={img} alt="" />
                        <Typography variant="h4" component="h4">
                            {name}
                        </Typography>
                        <Typography style={{ color: 'darkgoldenrod' }} variant="h6" component="h6">
                            Range: {range} Miles
                        </Typography>
                        <Typography variant="p" component="p">
                            {description}
                        </Typography>
                        <Typography style={{ color: 'dodgerblue' }} variant="h5" component="h5">
                            Price: {price} $
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="h4">
                            <b> Customer Details</b>
                        </Typography>
                        <form onSubmit={handleOrderSubmit}>
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
                            <FormControl sx={{ width: '90%', m: 1 }}>
                                <InputLabel htmlFor="formatted-text-mask-input">Mobile</InputLabel>
                                <Input
                                    required
                                    value={values.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    id="formatted-text-mask-input"
                                    inputComponent={phoneCustom}
                                    onBlur={handleOnBlur}
                                />
                            </FormControl>
                            <TextField
                                required
                                sx={{ width: '90%', m: 1 }}
                                id="outlined-multiline-static"
                                label="Your Address"
                                name="address"
                                onBlur={handleOnBlur}
                                multiline
                                rows={4}
                                placeholder="your present address"
                                defaultValue=""
                            />
                            <br />
                            <Button type="submit" variant="contained">Place Order</Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <div>
                {dialogBox}
            </div>
            <Footer />
        </Box>
    );
};

export default Book;