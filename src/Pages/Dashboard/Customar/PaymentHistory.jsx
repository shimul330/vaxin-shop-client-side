import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments =[], isLoading } = useQuery({
        queryKey: ["user-orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/customer/${user.email}`);
            return res.data
        }
    })

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Transaction ID</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {payments?.map((payment, index) => (
                            <tr key={payment?._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                        ${payment.paymentStatus === 'paid' ? 'bg-green-200 text-green-800' :
                                            payment.paymentStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-red-200 text-red-800'
                                        }`
                                    }>
                                        {payment.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;