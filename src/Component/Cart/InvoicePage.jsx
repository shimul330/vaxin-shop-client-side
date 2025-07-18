import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument';
import { getAuth } from 'firebase/auth';


const InvoicePage = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order-invoice', orderId],
    queryFn: async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const token = await currentUser.getIdToken();
        
        const res = await axiosSecure.get(`/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data;
      }
      catch (err) {
        console.log(err)
      }
    }

  });

  if (isLoading) return <div className="text-center py-6">Loading invoice...</div>;

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Invoice Preview</h2>

      <div className="bg-white shadow p-6 rounded-xl mb-6 text-gray-800">

        <p><strong>Email:</strong> {order.customer?.email}</p>
        <p><strong>Item:</strong> {order.itemName}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Paid:</strong> ${order.totalAmount}</p>

      </div>

      <div className="text-center">
        <PDFDownloadLink
          document={<InvoiceDocument order={order} />}
          fileName={`invoice-${order._id}.pdf`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoicePage;
