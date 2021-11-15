import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { makeStyles } from '@mui/styles';
import { Avatar, Container, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useAuth from '../../../hooks/useAuth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



const Navigation = () => {
    const { user, logOut } = useAuth();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };





    const useStyle = makeStyles({
        navItem: {
            color: '#fff',
            textDecoration: 'none'
        },
        navItemDown: {
            color: 'black',
            textDecoration: 'none'
        },
        navIcon: {
            [theme.breakpoints.up('md')]: {
                display: 'none ! important'
            }
        },
        navItemContainer: {
            [theme.breakpoints.down('md')]: {
                display: 'none ! important'
            }
        },
        navLogo: {
            [theme.breakpoints.down('md')]: {
                textAlign: 'center'
            },
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            }
        },
        mobileNavItem: {
            textDecoration: 'none',
            color: '#000'
        }
    })
    const { navItem, navIcon, navItemContainer, navLogo, mobileNavItem, navItemDown } = useStyle();

    const [state, setState] = React.useState(false);


    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"

        >
            <List>
                <ListItem button>
                    <ListItemText >
                        <Link className={mobileNavItem} to="/myaccount">
                            <Toolbar style={{ backgroundColor: 'gray', width: '80%', paddingLeft: '20px', borderRadius: '20px' }}> <Avatar sx={{ mx: 1 }} alt={user.displayName} src={user.photoURL} />  <b style={{ color: 'white' }}>{user.displayName}</b></Toolbar>
                        </Link>
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText >
                        <Link className={mobileNavItem} to="/home">Home</Link>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText >
                        <Link className={mobileNavItem} to="/services">
                            Explore EVs
                        </Link>
                    </ListItemText>
                </ListItem>
                <Divider />


                {
                    user?.email ?
                        <Box>
                            <ListItem button>
                                <ListItemText >
                                    <Link className={mobileNavItem} to="/dashboard">
                                        Dashboard
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemText > <Link className={mobileNavItem} to="/">
                                    <Button variant="contained" onClick={logOut} color="info">Logout</Button>
                                </Link> </ListItemText>
                            </ListItem>
                        </Box>

                        : <ListItem button>
                            <ListItemText > <Link className={mobileNavItem} to="/login">
                                <Button variant="contained" color="info">Login</Button>
                            </Link> </ListItemText>
                        </ListItem>
                }
            </List>


        </Box>
    );
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#00352c" }}>
                    <Container maxWidth="xl">
                        <Toolbar style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                className={navIcon}
                                onClick={() => setState(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography className={navLogo} variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                Electro  <ElectricCarIcon /> Boom
                            </Typography>
                            <Box className={navItemContainer}>
                                <Link className={navItem} to="/home">
                                    <Button variant="text" color="inherit">Home</Button>
                                </Link>
                                <Link className={navItem} to="/services">
                                    <Button variant="text" color="inherit">Explore EVs</Button>
                                </Link>
                                {
                                    user?.email ?
                                        <Box component="div" sx={{ display: 'inline' }}>
                                            <Link className={navItem} to="/dashboard">
                                                <Button variant="text" color="inherit">Dashboard</Button>
                                            </Link>

                                            <Button
                                                id="fade-button"
                                                aria-controls="fade-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <Toolbar style={{ backgroundColor: 'SeaGreen ', width: '80%', paddingLeft: '1px', borderRadius: '10px' }}> <Avatar sx={{ mx: 1 }} alt={user.displayName} src={user.photoURL} />  <b style={{ color: 'white' }}>{user.displayName}</b><ArrowDownwardIcon color='action' style={{ marginRight: '0px' }} /></Toolbar>
                                            </Button>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "center",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <Link className={navItemDown} to="/myaccount">
                                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                                </Link>
                                                <MenuItem onClick={handleClose}> <Link className={navItem} to="/">
                                                    <Button variant="contained" onClick={logOut} color="info">Logout</Button>
                                                </Link></MenuItem>
                                            </Menu>
                                        </Box>

                                        : <Link className={navItem} to="/login">
                                            <Button variant="contained" color="info">Login/Sign Up</Button>
                                        </Link>
                                }

                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <div>

                <React.Fragment>
                    <Drawer
                        open={state}
                        onClose={() => setState(false)}
                    >
                        {list}
                    </Drawer>
                </React.Fragment>
            </div>
        </div>
    );
};

export default Navigation;