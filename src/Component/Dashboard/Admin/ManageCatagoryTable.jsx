import React, { useState } from 'react';
import ManageCatagoryUpdate from './ManageCatagoryUpdate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageCatagoryTable = ({ medicine, index }) => {

    let [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const handleUpdateClick = () => {
        setSelectedCategory(medicine);
        setIsOpen(true);
    };
    //admin delete the seller medicine data

    const deleteCategoryMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/category/${id}`)
            return res.data;
        },
        onSuccess: (data) => {
            toast.success("Category deleted!");
            queryClient.invalidateQueries(['categories']);
        },
        onError: (err) => {
            toast.error("Delete failed!");
        }
    })

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
            deleteCategoryMutation.mutate(id);
        }

    }
    return (
        <tr>
            <td>
                {index}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            {medicine.image && (
                                <img src={medicine.image} alt="Category" />
                            )}
                        </div>
                    </div>

                </div>
            </td>

            <td>
                <h2>{medicine?.itemName}</h2>
            </td>
            <td>
                <h2>{medicine?.category}</h2>
            </td>

            <td>
                <div className='flex items-center gap-3'>
                    <button onClick={handleUpdateClick} className="btn btn-primary">Update</button>
                    <button onClick={() => handleDelete(medicine?._id)} className="btn btn-error">Delete</button>
                </div>
                {/* Modal */}
                <ManageCatagoryUpdate isOpen={isOpen} setIsOpen={setIsOpen} selectedCategory={selectedCategory}></ManageCatagoryUpdate>
            </td>

        </tr>
    );
};

export default ManageCatagoryTable;