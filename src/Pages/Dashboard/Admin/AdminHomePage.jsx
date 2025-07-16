import React from 'react';
import { FaMoneyBill, FaClock, FaWallet } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHomePage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['sales-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sales-stats');
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    const { totalRevenue, paidTotal, pendingTotal } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Revenue */}
            <div className="flex items-center bg-blue-100 p-4 rounded-xl shadow">
                <FaWallet className="text-3xl text-blue-800 mr-4" />
                <div>
                    <h3 className="text-lg font-semibold text-blue-800">Total Revenue</h3>
                    <p className="text-xl font-bold text-blue-900">${totalRevenue?.toFixed(2)}</p>
                </div>
            </div>

            {/* Paid */}
            <div className="flex items-center bg-green-100 p-4 rounded-xl shadow">
                <FaMoneyBill className="text-3xl text-green-800 mr-4" />
                <div>
                    <h3 className="text-lg font-semibold text-green-800">Total Paid</h3>
                    <p className="text-xl font-bold text-green-900">${paidTotal?.toFixed(2)}</p>
                </div>
            </div>

            {/* Pending */}
            <div className="flex items-center bg-yellow-100 p-4 rounded-xl shadow">
                <FaClock className="text-3xl text-yellow-800 mr-4" />
                <div>
                    <h3 className="text-lg font-semibold text-yellow-800">Total Pending</h3>
                    <p className="text-xl font-bold text-yellow-900">${pendingTotal?.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;