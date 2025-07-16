import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import PaymentHistoryTable from '../../../Component/Dashboard/Seller/PaymentHistoryTable';

const PaymentHistorySeller = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //tanstack useQuary get
    const { data: orders, isLoading } = useQuery({
        queryKey: ["seller-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/seller-orders/${user?.email}`)
            return res.data;
        }
    })
    
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <BounceLoader color="#36d7b7" />
        </div>
    );
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">🧾 Payment History</h2>
            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                    <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold tracking-wide">#</th>
                            <th className="px-6 py-3 text-left font-semibold">Medicine Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Buyer</th>
                            <th className="px-6 py-3 text-center font-semibold">Quantity</th>
                            <th className="px-6 py-3 text-right font-semibold">Total</th>
                            <th className="px-6 py-3 text-center font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {
                            orders?.map((order, index) => <PaymentHistoryTable key={order?._id} index={index} order={order} ></PaymentHistoryTable>)
                        }
                    </tbody>
                </table>

                {orders?.length === 0 && (
                    <p className="text-center py-6 text-gray-500">😞 কোনো অর্ডার পাওয়া যায়নি।</p>
                )}
            </div>
        </div>

    );
};

export default PaymentHistorySeller;