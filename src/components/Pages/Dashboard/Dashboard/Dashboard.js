import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Avatar, Button } from '@mui/material';
import DashBoardHome from '../DashBoardHome/DashBoardHome';
import MakeAdmin from '../Admin/MakeAdmin/MakeAdmin';
import AddServices from '../../AddServices/AddServices'
import { Link } from 'react-router-dom';
import ManageProducts from '../Admin/ManageProducts/ManageProducts';
import AddReviews from '../Customer/AddReviews/AddReviews';
import useAuth from '../../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import Orders from '../DashBoardHome/Orders/Orders';
import AllOrders from '../DashBoardHome/Orders/AllOrders/AllOrders';
import SvgIcon from '@mui/material/SvgIcon';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SortIcon from '@mui/icons-material/Sort';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CarRentalIcon from '@mui/icons-material/CarRental';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Payment from '../Customer/Payment/Payment';
import PaymentIcon from '@mui/icons-material/Payment';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const drawerWidth = 230;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { admin, user, logOut } = useAuth();
    let { path, url } = useRouteMatch();

    const name = user.displayName;
    const firstLetter = name.charAt(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar style={{ backgroundColor: 'gray', width: '100%', paddingLeft: '10px' }}>{user.photURL ? <Avatar sx={{ mx: 2 }} alt={user.displayName} src={user.photoURL} /> : <Avatar sx={{ mx: 2 }}>{firstLetter}</Avatar>} <b>{user.displayName}</b></Toolbar>
            <Divider />
            <Link style={{ textDecoration: 'none' }} to="/home">
                <Button color="success"><HomeIcon sx={{ mx: 1 }} color="success" />Home</Button>
            </Link> <Divider />
            <Link style={{ textDecoration: 'none' }} to={`${url}/myorders`}>
                <Button color="success"><BookmarkAddedIcon sx={{ mx: 1 }} color="success" />My Orders</Button>
            </Link>
            <Divider />
            <Link style={{ textDecoration: 'none' }} to={`${url}/payment`}>
                <Button color="success"><PaymentIcon sx={{ mx: 1 }} color="success" />Payment</Button>
            </Link>
            <Divider />
            {
                admin && <Box>
                    <Link style={{ textDecoration: 'none' }} to={`${url}/allorders`}>
                        <Button color="inherit"><SortIcon sx={{ mx: 1 }} color="info" />Manage All Orders</Button>
                    </Link>
                    <Divider />
                    <Link style={{ textDecoration: 'none' }} to={`${url}/makeadmin`}>
                        <Button color="inherit"><AdminPanelSettingsIcon sx={{ mx: 1 }} />Make Admin</Button>
                    </Link> <Divider sx={{ m: 1 }} />
                    <Link style={{ textDecoration: 'none' }} to={`${url}/addservices`}>
                        <Button color="inherit"><AddCircleIcon sx={{ mx: 1 }} color="info" />Add Car</Button>
                    </Link><Divider sx={{ m: 1 }} />
                    <Link style={{ textDecoration: 'none' }} to={`${url}/manageservices`}>
                        <Button color="inherit"><CarRentalIcon sx={{ mx: 1 }} color="info" />Manage Cars</Button>
                    </Link><Divider sx={{ m: 1 }} />
                </Box>
            }
            <Link style={{ textDecoration: 'none' }} to={`${url}/addreview`}>
                <Button color="success"><RateReviewIcon sx={{ mx: 1 }} color="success" />Review Product</Button>
            </Link>
            <Divider sx={{ m: 1 }} />
            <Link style={{ textDecoration: 'none' }} to="/">
                <Button style={{ marginLeft: '20px' }} variant="contained" onClick={logOut} color="info">Logout</Button>
            </Link>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ textAlign: 'center' }} variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Electro  <ElectricCarIcon /> Boom Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={path}>
                        <DashBoardHome></DashBoardHome>
                    </Route>
                    <AdminRoute path={`${path}/makeadmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addservices`}>
                        <AddServices />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageservices`}>
                        <ManageProducts />
                    </AdminRoute>
                    <Route path={`${path}/addreview`}>
                        <AddReviews />
                    </Route>
                    <AdminRoute path={`${path}/allorders`}>
                        <AllOrders />
                    </AdminRoute>
                    <Route path={`${path}/myorders`}>
                        <Orders />
                    </Route>
                    <Route path={`${path}/payment`}>
                        <Payment />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
