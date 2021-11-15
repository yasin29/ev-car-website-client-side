import React from 'react';
import Footer from '../../../Shared/Footer/Footer';
import Navigation from '../../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import Map from '../Map/Map';
import TopProducts from '../TopProducts/TopProducts';
import TopReviews from '../TopReviews/TopReviews';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <TopProducts></TopProducts>
            <TopReviews></TopReviews>
            <Map></Map>
            <Footer></Footer>
        </div>
    );
};

export default Home;