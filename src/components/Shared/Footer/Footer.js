
import { Box } from '@mui/system';
import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <Box>
            <footer className="footer-distributed">
                <div className="footer-right">

                    <a href="a"><i className="fa fa-facebook"></i></a>
                    <a href="b"><i className="fa fa-twitter"></i></a>
                    <a href="c"><i className="fa fa-linkedin"></i></a>
                    <a href="d"><i className="fa fa-github"></i></a>

                </div>

                <div className="footer-left">

                    <p className="footer-links">
                        <a className="link-1" href="e">Home</a>

                        <a href="f">Vehicles</a>

                        <a href="g">Pricing</a>

                        <a href="h">About</a>

                        <a href="i">Faq</a>

                        <a href="j">Contact</a>
                    </p>

                    <p>Electro Boom &copy; 2021</p>
                </div>

            </footer>
        </Box>
    );
};

export default Footer;