import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Container } from '@mui/material';

const Map = () => {
    const containerStyle = {
        width: '70vw',
        height: '50vh',
        margin: 'auto'
    };

    const center = {
        lat: 23.77772846032212,
        lng: 90.39736896862044
    };
    const onLoad = marker => {
        console.log('marker: ', marker)
    }

    const position = {
        lat: 23.757177405164057,
        lng: 90.39852128074962
    }
    const position2 = {
        lat: 23.772353731441527,
        lng: 90.3670066181657
    }
    const position3 = {
        lat: 23.78492235999012,
        lng: 90.42609181206535
    }
    return (
        <Container maxWidth="xl">
            <h2> Our Showrooms</h2>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    <Marker
                        onLoad={onLoad}
                        position={position}
                    />
                    <Marker
                        onLoad={onLoad}
                        position={position2}
                    />
                    <Marker
                        onLoad={onLoad}
                        position={position3}
                    />
                </GoogleMap>
            </LoadScript>
        </Container>
    );
};

export default Map;