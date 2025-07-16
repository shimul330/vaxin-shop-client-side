import React from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import MenuItem from './MenuItem';

const CustomerMenu = () => {
    return (
        <div>
            <MenuItem icon={FaMoneyCheckAlt} label='Payment History' address='/dashboard/payment-history'></MenuItem>
            <MenuItem icon={FaMoneyCheckAlt} label='Become a Seller' address='/dashboard/become-seller'></MenuItem>
        </div>
    );
};

export default CustomerMenu;