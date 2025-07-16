import React from 'react';
import { FaPills } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaBullhorn } from 'react-icons/fa';
import MenuItem from './MenuItem';


const SellerMenu = () => {
    return (
        <div>
            <MenuItem
                icon={FaBullhorn}
                label='Seller HomePage'
                address='/dashboard/seller-homepage'
            />
            
            <MenuItem
                icon={FaPills}
                label='Manage Medicines'
                address='/dashboard/manage-medicines'
            />
            
            <MenuItem icon={FaMoneyBillWave} 
            label='Payment History' 
            address='/dashboard/seller-payment-history' 
            />
            
            <MenuItem
                icon={FaBullhorn}
                label='Ask For Advertisement'
                address='/dashboard/ask-advertisment'
            />
            
        </div>
    );
};

export default SellerMenu;