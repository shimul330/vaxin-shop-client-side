import React from 'react';

import { FaMoneyCheckAlt, FaHourglassHalf, FaClipboardList } from 'react-icons/fa';
import useSellerOrders from '../../../hooks/useSellerOrders';

const SellerHomePage = () => {
    const { orders, isLoading } = useSellerOrders();

    if (isLoading) return <p className="text-center py-6">Loading seller stats...</p>;

    const paidOrders = orders.filter(order => order.paymentStatus === 'paid');
    const pendingOrders = orders.filter(order => order.paymentStatus === 'pending');

   const paidTotal = paidOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
const pendingTotal = pendingOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">💼 Seller Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Paid Revenue */}
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                        <FaMoneyCheckAlt className="text-3xl text-green-700" />
                        <div>
                            <p className="text-lg font-semibold text-green-800">Total Paid</p>
                            <h3 className="text-2xl font-bold text-green-900">${paidTotal.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Pending Revenue */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                        <FaHourglassHalf className="text-3xl text-yellow-700" />
                        <div>
                            <p className="text-lg font-semibold text-yellow-800">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-yellow-900">${pendingTotal.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-4">
                        <FaClipboardList className="text-3xl text-blue-700" />
                        <div>
                            <p className="text-lg font-semibold text-blue-800">Total Orders</p>
                            <h3 className="text-2xl font-bold text-blue-900">{orders.length}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerHomePage;
