import React from 'react';

const PaymentHistoryTable = ({ order, index }) => {

    return (
        <tr className="hover:bg-gray-50 transition-all">
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{order?.itemName}</td>
            <td className="px-6 py-4">{order?.customer?.email}</td>
            <td className="px-6 py-4 text-center">{order.quantity}</td>
            <td className="px-6 py-4 text-right font-medium text-blue-600">
                ${order.totalAmount}
            </td>
            <td className="px-6 py-4 text-center">
                <span className={order.paymentStatus === 'paid' ? "text-green-500" : "text-red-600"}>
                    {order.paymentStatus === 'paid' ? "Paid" : "Pending"}
                </span>
            </td>
        </tr>
    );
};

export default PaymentHistoryTable;