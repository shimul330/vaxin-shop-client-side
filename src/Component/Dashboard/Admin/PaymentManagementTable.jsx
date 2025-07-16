import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const PaymentManagementTable = ({order}) => {
    
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // payment stutus patch query
    const mutation = useMutation({
        mutationFn: async(id)=>{
            const res = await axiosSecure.patch(`/order/payment-status/${id}`);
            return res.data
        },
        onSuccess: () => {
        toast.success("Payment Accepted!");
        queryClient.invalidateQueries(['orders']); 
    }
    })


    const handleUpdateStatus = (id)=>{
        mutation.mutate(id)
    }

    return (
        <tr
           
            className={`border-b ${order.paymentStatus === 'pending' ? 'bg-yellow-50' : 'bg-green-50'}`}
        >
            <td className="px-4 py-2 font-medium text-gray-800">{order?.customer?.email}</td>
            <td className="px-4 py-2">{order?.totalAmount}$</td>
            <td className="px-4 py-2 capitalize">
                <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}
                >
                    {order.paymentStatus}
                </span>
            </td>
            <td className="px-4 py-2">
                {order.paymentStatus === 'pending' ? (
                    <button onClick={()=>handleUpdateStatus(order?._id)} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow">
                        ✅ Accept Payment
                    </button>
                ) : (
                    <span className="text-gray-400 text-sm">❌ No</span>
                )}
            </td>
        </tr>
    );
};

export default PaymentManagementTable;