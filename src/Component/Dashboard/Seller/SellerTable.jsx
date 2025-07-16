import React, { useState } from 'react';
import Table from './Table';
import UpdateSellerMedicine from './UpdateSellerMedicine';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const SellerTable = ({ sellerMedicines }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/medicines/${selectedMedicine._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Medicine updated successfully!");
            queryClient.invalidateQueries(['seller-medicines']);
        }
    });

    const handleEditClick = (medicine) => {
        setSelectedMedicine(medicine);
        setIsOpen(true);
    };

    const handleUpdateSubmit = (data) => {
        const { _id, ...updatedData } = data;
        mutate(updatedData);
        setIsOpen(false);
    };

    return (
        <div className="py-6 px-4">
            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">#</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Name</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Generic Name</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Company</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Category</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Unit Price</th>
                            <th className="px-4 py-3 text-left font-semibold tracking-wide">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sellerMedicines.map((medicine, index) => (
                            <Table
                                key={medicine._id}
                                index={index}
                                medicine={medicine}
                                onEdit={handleEditClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modal must be outside of table */}
            {selectedMedicine && (
                <UpdateSellerMedicine
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    medicine={selectedMedicine}
                    onSubmit={handleUpdateSubmit}
                />
            )}
        </div>
    );
};

export default SellerTable;
