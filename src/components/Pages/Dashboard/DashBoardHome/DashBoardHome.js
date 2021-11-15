import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import AllOrders from './Orders/AllOrders/AllOrders';
import Orders from './Orders/Orders';

const DashBoardHome = () => {
    const { admin } = useAuth();
    return (
        <div>
            {
                admin ?
                    <AllOrders></AllOrders>
                    :
                    <Orders></Orders>
            }
        </div>
    );
};

export default DashBoardHome;