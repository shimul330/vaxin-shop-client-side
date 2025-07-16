import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery} from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import PaymentManagementTable from '../../../Component/Dashboard/Admin/PaymentManagementTable';

const PaymentManageMent = () => {
    const axiosSecure = useAxiosSecure();
   

    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure("/orders");
            return res.data;
        }
    })

    if(isLoading) return   <BounceLoader />

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Payment ManageMent</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-blue-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Total Price</th>
                            <th className="px-4 py-2 text-left">Payment Status</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        orders.map(order=> <PaymentManagementTable key={order?._id} order={order} />)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManageMent;