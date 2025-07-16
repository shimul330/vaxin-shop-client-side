# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from '../../hooks/useAxiosSecure'; // তোমার কাস্টম হুক
import toast from 'react-hot-toast';

const ManageCategoryUpdate = ({ isOpen, setIsOpen, selectedCategory }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            category: selectedCategory?.category || '',
        }
    });

    const queryClient = useQueryClient();

    const updateCategoryMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.patch(`/category/${selectedCategory?._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Category updated successfully!");
            queryClient.invalidateQueries(['categories']);
            setIsOpen(false);
            reset();
        },
        onError: () => {
            toast.error("Failed to update category");
        }
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('category', data.category);
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }
        updateCategoryMutation.mutate(formData);
    };

    function close() {
        setIsOpen(false);
        reset();
    }

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10"
            onClose={close}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/90 p-6 backdrop-blur-xl shadow-xl"
                    >
                        <DialogTitle as="h3" className="text-lg font-semibold text-gray-800">
                            Update Category
                        </DialogTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
                                    {...register("image")}
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between pt-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                    disabled={updateCategoryMutation.isLoading}
                                >
                                    {updateCategoryMutation.isLoading ? "Updating..." : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={close}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
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

export default ManageCategoryUpdate;





app.patch('/category/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { category, image } = req.body;

        const updated = await categoriesCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    category,
                    image,
                    updatedAt: new Date()
                }
            }
        );

        res.send(updated);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to update category' });
    }
});
