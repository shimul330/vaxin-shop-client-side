import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.displayName,
        }
    });

    const [profilePic, setProfilePic] = useState(user?.photoURL)

    const onSubmit = async (data) => {

        const updateProfile = {
            displayName: data.name,
            photoURL: profilePic
        };

        try {
            await updateUserProfile(updateProfile);
            setUser({
                ...user,
                displayName: updateProfile.displayName,
                photoURL: updateProfile.photoURL,
            });
            toast.success("Profile updated successfully");
            navigate("/")

        } catch {
            toast.error("Profile update failed");
        }
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        const res = await axios.post(imageUploadUrl, formData);
        setProfilePic(res.data.data.url);

    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="max-w-md w-full p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name input */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Your Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Enter new name"
                        />
                    </div>

                    {/* Profile Image Upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {profilePic && (
                            <img
                                src={profilePic}
                                alt="Preview"
                                className="w-16 h-16 mt-2 rounded-full object-cover"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UpdateProfile;