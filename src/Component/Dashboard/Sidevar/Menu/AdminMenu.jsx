import React from 'react';
import MenuItem from './MenuItem';
import { FaUsers } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { MdOutlineMonitor } from 'react-icons/md'; 
import { FaListAlt } from 'react-icons/fa';



const AdminMenu = () => {
    return (
        <div>
            <MenuItem
                icon={FaUsers}
                label='Admin Homepage'
                address='/dashboard/admin-homepage'
            />
            <MenuItem
                icon={FaUsers}
                label='Manage Users'
                address='/dashboard/manage-users'
            />
            <MenuItem icon={FaListAlt} 
            label='Manage Category' 
            address='/dashboard/manage-catagory'

            />
            
            <MenuItem
                icon={FaCreditCard}
                label='Payment management'
                address='/dashboard/payment-management'
            />
            <MenuItem
                icon={FaChartLine}
                label='Sales Report'
                address='/dashboard/sales-report'
            />
            <MenuItem
                icon={MdOutlineMonitor}
                label='Manage banner Advertise'
                address='/dashboard/banner-advertise'
            />
        </div>
    );
};

export default AdminMenu;