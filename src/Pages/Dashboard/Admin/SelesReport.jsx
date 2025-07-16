import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { FiDownload } from "react-icons/fi";





const SelesReport = () => {
    const axiosSecure = useAxiosSecure();


    const { data: sales, isLoading } = useQuery({
        queryKey: ["sales-report"],
        queryFn: async () => {
            const res = await axiosSecure.get('/sales');
            return res.data;
        },

    })

    if (isLoading) return <p>Loading...</p>;

    // pdf file
    const handlePDFDownload = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            head: [['Medicine', 'Seller', 'Buyer', 'Qty', 'Total', 'Date']],
            body: sales.map(item => [
                item.itemName,
                item?.seller?.email,
                item?.customer?.email,
                item?.quantity,
                `$${item?.totalAmount}`,
                format(new Date(item.createdAt), 'PPP')
            ]),
        });

        doc.text("Sales Report", 14, 10);

        doc.save("sales-report.pdf");
    }
    // excel file
    const handleExcelDownload = () => {

        const flatSales = sales.map(item => ({
            Medicine: item.itemName,
            SellerName: item?.seller?.name || '',
            SellerEmail: item?.seller?.email || '',
            BuyerEmail: item?.customer?.email || '',
            Quantity: item.quantity,
            TotalAmount: item.totalAmount,
            PaymentStatus: item.paymentStatus,
            OrderDate: format(new Date(item.createdAt), 'PPP'),
        }));


        const ws = XLSX.utils.json_to_sheet(flatSales);


        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "sales-report.xlsx");

    }
    // Doc file
    const handleDocxDownload = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Sales Report",
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                        }),
                        ...sales.map((item) =>
                            new Paragraph(
                                `${item.itemName} | ${item?.seller?.email || 'N/A'} | ${item?.customer?.email || 'N/A'} | Qty: ${item.quantity} | $${item.totalAmount} | ${item.createdAt ? format(new Date(item.createdAt), 'PPP') : 'N/A'}`
                            )
                        ),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "sales-report.docx");
    };



    return (
        <div className="p-4">
            <h2 className="text-xl text-center font-semibold mb-4">Sales Report</h2>

            {/* Table */}
            <table className="table w-full shadow-2xl rounded-2xl">
                <thead className="bg-blue-400 text-white ">
                    <tr>
                        <th>Medicine</th>
                        <th>Seller</th>
                        <th>Buyer</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Payment Status</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sales?.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.itemName}</td>
                            <td>{item?.seller?.email}</td>
                            <td>{item?.customer?.email}</td>
                            <td>{item?.quantity}</td>
                            <td>${item?.totalAmount}</td>
                            <td className={`${item.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-600'}`}>
                                {item.paymentStatus}
                            </td>
                            <td>{format(new Date(item.createdAt), 'PPP')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-3 mt-4">

                <div className="flex gap-3 mt-4">
                    <button onClick={handlePDFDownload} className="btn btn-sm btn-primary flex items-center gap-2">
                        <FiDownload /> PDF Download
                    </button>

                    <button onClick={handleExcelDownload} className="btn btn-sm btn-success flex items-center gap-2">
                        <FiDownload /> Excel Download
                    </button>

                    <button onClick={handleDocxDownload} className="btn btn-sm btn-info text-white flex items-center gap-2">
                        <FiDownload /> Word Download
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SelesReport;