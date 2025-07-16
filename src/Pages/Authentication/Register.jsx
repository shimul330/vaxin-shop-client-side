import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [profilePic, setprofilePic] = useState('');
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async (result) => {
                // 1. Save user in database
                const userInfo = {
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };
                await axios.post('http://localhost:3000/users', userInfo);

                // 2. Update Firebase profile
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                };
                await updateUserProfile(userProfile); 

         
                toast.success('Registration successful');
                reset();           
                navigate(from);    
            })
            .catch((error) => {
                toast.warning('Sorry, registration failed: ' + error.message);
            });
    };


    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)

       console.log(res.data.data.url);
        setprofilePic(res.data.data.url);

    }

    return (
        <div >
            <div className="min-h-screen flex items-center justify-center  ">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an account</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {
                                errors.name?.type === "required" && <p className='text-red-500'>Name is required</p>
                            }
                        </div>
                        {/* Image Upload */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />

                        </div>
                        {/* Email field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {
                                errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true, minLength: 6 })}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {
                                errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>
                            }
                            {
                                errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters</p>
                            }
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Register
                        </button>
                        <p className='mt-2'>Already have an account <Link className='text-blue-600 underline' to='/login'>Login</Link> </p>
                    </form>
                    <SocialLogin>-</SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;