// 📁 pages/AskAdvertiseMent.jsx

import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import AddAdvertisementModal from '../../../Component/Dashboard/Seller/AddAdvertisementModal';
import AskAdvertiseMentList from '../../../Component/Dashboard/Seller/AskAdvertiseMentList';
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';


const AskAdvertiseMent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const auth = getAuth();
    const sellerEmail = user?.email;

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['ads', sellerEmail],
        queryFn: async () => {
             const currentUser = auth.currentUser;
            const token = await currentUser.getIdToken();
            const res = await axiosSecure.get(`/advertisements/${sellerEmail}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            return res.data;
        },
        enabled: !!sellerEmail, // wait for email to be available
    });

    if(isLoading) return <BounceLoader />

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Advertisement Management</h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-green-600 shadow-xl hover:bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Advertisement
                </button>
            </div>
            <AskAdvertiseMentList ads={ads} ></AskAdvertiseMentList>
            {/* 🔽 Modal Component Injected */}
            <AddAdvertisementModal isOpen={isOpen} setIsOpen={setIsOpen} sellerEmail={sellerEmail} />
        </div>
    );
};

export default AskAdvertiseMent;
