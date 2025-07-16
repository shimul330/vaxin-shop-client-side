import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';

const CategoryPageDetails = () => {
    const { categoryName } = useParams(); 
    const axiosSecure = useAxiosSecure();

    const { data: medicines, isLoading } = useQuery({
        queryKey: ['medicines-by-category', categoryName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines-by-category/${categoryName}`);
            return res.data;
        }
    });

    if (isLoading) return <BounceLoader />

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Medicines in "{categoryName}"</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Item Name</th>
                            <th className="p-2 border">Generic Name</th>
                            <th className="p-2 border">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr key={medicine._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{medicine.itemName}</td>
                                <td className="p-2 border">{medicine.genericName}</td>
                                <td className="p-2 border">${medicine.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryPageDetails;
