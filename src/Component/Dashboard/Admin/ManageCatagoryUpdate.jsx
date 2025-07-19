import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const ManageCatagoryUpdate = ({ isOpen, setIsOpen, selectedCategory }) => {

    const axiosSecure = useAxiosSecure();
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
     const queryClient = useQueryClient();
     const auth = getAuth();

    // React hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            category: selectedCategory?.category || '',
        }
    });

    //image upload
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
            const imgURL = res.data?.data?.url;

            if (imgURL) {
                setImageUrl(imgURL);
                toast.success("image upload")
               
            } else {
                toast.error("Upload failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Image upload error");
        } finally {
            setUploading(false);
        }
    };

    // tanstask update 
    const updateCategoryMutation = useMutation({
        mutationFn: async (formData) => {
            const currentUser = auth.currentUser;
            const token = await currentUser.getIdToken();
            const res = await axiosSecure.patch(`/category/${selectedCategory?._id}`, formData,{
                headers:{
                     Authorization: `Bearer ${token}`,
                }
            })
            return res.data;
        },
        onSuccess: () => {
            toast.success("Category updated successfully!");
            queryClient.invalidateQueries(['categories']);
            setIsOpen(false);
            reset();
            setImageUrl(null);
        },
        onError: () => {
            toast.error("Failed to update category");
        }
    })
    

    //image and catagory catch
    const onSubmit = (data) => {
        if (!imageUrl && !selectedCategory?.image) {
            toast.error("Please upload an image");
            return;
        }

        const payload = {
            category: data.category,
            image: imageUrl || selectedCategory?.image
        };
        updateCategoryMutation.mutate(payload);
    }

    function close() {
        setIsOpen(false)
    }



    return (
        <Dialog
            open={isOpen}
            as='div'
            className='relative z-10 focus:outline-none'
            onClose={close}
        >
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel
                        transition
                        className='w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl'
                    >
                        <DialogTitle
                            as='h3'
                            className='text-base/7 font-medium text-black'
                        >
                            Manage Medicine Update
                        </DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Category Select Input */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Category Name</label>
                                <select
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Ointment">Ointment</option>
                                    <option value="Others">Others</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Category Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                />
                                {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
                            </div>
                            {/* button  */}
                            <div className='flex justify-between mt-5'>
                                <button
                                    type='submit'
                                    className='bg-green-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl '
                                >
                                    Update
                                </button>
                                <button
                                    onClick={close}
                                    type='button'
                                    className='bg-red-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl'
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ManageCatagoryUpdate;