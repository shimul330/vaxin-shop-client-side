// components/dashboard/DefaultDashboard.jsx
import React from 'react';


import { BounceLoader } from 'react-spinners';
import useRole from '../../hooks/useRole';
import AdminHomePage from '../../Pages/Dashboard/Admin/AdminHomePage';
import SellerHomePage from '../../Pages/Dashboard/Seller/SellerHomePage';
import PaymentHistory from '../../Pages/Dashboard/Customar/PaymentHistory';

const DefaultDashboard = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return (
            <div className="flex justify-center py-10">
                <BounceLoader />
            </div>
        );
    }

    if (role === 'admin') {
        return <AdminHomePage />;
    }

    if (role === 'seller') {
        return <SellerHomePage />;
    }
    if(role === 'user'){
        return <PaymentHistory/>
    }

    return (
        <div className="text-center py-10 text-gray-600 text-lg">
            Welcome to your Dashboard!
        </div>
    );
};

export default DefaultDashboard;
