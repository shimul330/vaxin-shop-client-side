import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const BannerTable = ({ ad }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const approveMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/advertisements/approve/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Advertisement approved!");
            queryClient.invalidateQueries(['all-ads']);
        },
        onError: () => {
            toast.error("Approval failed");
        }
    })

    const handleApprove = () => {
        approveMutation.mutate(ad?._id);
    };

    const deleteAdvertiesMent = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/delete-advertisement/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Add Deleted!");
            queryClient.invalidateQueries(['all-ads']);
        },
        onError: () => {
            toast.error("Approval failed");
        }
    })

    const handleDeleteAd = (id) => {
        deleteAdvertiesMent.mutate(id);
    }
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">
                <img src={ad?.image} alt="image" className="w-16 h-16 object-cover rounded" />
            </td>
            <td className="px-4 py-2">{ad?.description}</td>
            <td className="px-4 py-2">{ad?.sellerEmail}</td>

            {/* ✅ Centered badge + button */}
            <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                    <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${ad.status === 'approved'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}
                    >
                        {ad.status}
                    </span>
                    {
                        ad.status !== 'approved' && (
                            <button
                                onClick={handleApprove}
                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                            >
                                Approve
                            </button>
                        )
                    }
                </div>
            </td>

            <td className="px-4 py-2">
                <button onClick={() => handleDeleteAd(ad?._id)} className='btn btn-error btn-sm'>Delete</button>
            </td>
        </tr>

    );
};

export default BannerTable;