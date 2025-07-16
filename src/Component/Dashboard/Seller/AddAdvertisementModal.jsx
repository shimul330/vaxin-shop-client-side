import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddAdvertisementModal = ({ isOpen, setIsOpen, sellerEmail }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Upload image to imgbb
    const uploadImageToImgbb = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        const res = await axios.post(imageUploadUrl, formData);
        return res.data?.data?.url;
    };

    // ✅ Submit handler
    const onSubmit = async (data) => {
        try {
            const imageFile = data.image[0];
            const imageUrl = await uploadImageToImgbb(imageFile);

            const adData = {
                sellerEmail,
                image: imageUrl,
                description: data.description,
            };

            mutation.mutate(adData);
        } catch (err) {
            toast.error('Image upload failed');
        }
    };

    // ✅ Mutation to submit advertisement
    const mutation = useMutation({
        mutationFn: async (adData) => {
            const res = await axiosSecure.post('/advertisements', adData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Advertisement submitted!');
            queryClient.invalidateQueries(['ads', sellerEmail]);
            reset();
            setIsOpen(false);
        },
        onError: () => {
            toast.error('Failed to submit advertisement');
        },
    });

console.log(mutation)

    function close() {
        setIsOpen(false)
    }

    return (
        <>


            <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                        >
                            <DialogTitle as="h3" className="text-lg font-semibold text-black mb-4">
                                Add Advertisement
                            </DialogTitle>

                            {/* 🔽 Form or Content Goes Here */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* ✅ Image File Upload Field */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('image', { required: true })}
                                    className="w-full border p-2 rounded"
                                />

                                {/* ✅ Description Field */}
                                <textarea
                                    {...register('description', { required: true })}
                                    placeholder="Short description"
                                    className="w-full border p-2 rounded"
                                    rows={3}
                                />

                                {/* ✅ Submit Button */}
                                <div className='flex items-center justify-between'>
                                    <button
                                        type="submit"
                                        className=" bg-blue-600 px-3 text-white py-2 rounded hover:bg-blue-500"
                                    >
                                        Submit
                                    </button>
                                    <button onClick={()=>setIsOpen(false)} className='btn btn-error'>Cancel</button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>
    )
}
export default AddAdvertisementModal;