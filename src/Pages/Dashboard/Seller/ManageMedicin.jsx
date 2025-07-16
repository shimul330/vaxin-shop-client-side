import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddMedicineForm from '../../../Component/DashboardMainContent/AddMedicineForm';
import axios from 'axios';
import SellerTable from '../../../Component/Dashboard/Seller/SellerTable';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BounceLoader } from 'react-spinners';

const ManageMedicin = () => {
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [medicineImg, setMedicineImg] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: sellerMedicines , isLoading } = useQuery({
        queryKey: ['seller-medicines', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines/seller/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const onSubmit = async (data) => {
        setIsUploading(true);
        try {
            const medicineData = {
                itemName: data.itemName,
                genericName: data.genericName,
                description: data.description,
                image: medicineImg,
                category: data.category,
                company: data.company,
                unit: data.unit,
                price: parseFloat(data.price),
                discount: parseInt(data.discount || 0),
                seller: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                },
                createdAt: new Date(),
            };

            const res = await axios.post('http://localhost:3000/add-medicine', medicineData);
            toast.success("Medicine added successfully!");
            reset();
            setShowModal(false);
            queryClient.invalidateQueries(['seller-medicines', user?.email]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleMedicineImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        const res = await axios.post(imageUploadUrl, formData);
        setMedicineImg(res.data.data.url);
    };

    return (
        <div className="p-4">
            {/* Button */}
            <div className="mb-4">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Add Medicine
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">Add New Medicine</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <AddMedicineForm register={register} errors={errors} handleMedicineImageUpload={handleMedicineImageUpload} />
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="submit" className="btn btn-success">
                                    {isUploading ? "Saving..." : "Save"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-error">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Loading */}
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <BounceLoader color="#36d7b7" />
                </div>
            ) : (
                <SellerTable sellerMedicines={sellerMedicines} />
            )}
        </div>
    );
};

export default ManageMedicin;