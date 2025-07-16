import React, { useState } from 'react';
import BecomeSellerModal from '../../../Component/Dashboard/Users/BecomeSellerModal';
import useAuth from '../../../hooks/useAuth';

const BecomeSeller = () => {
    let [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    You are just one step away from becoming a Seller!
                </h1>
            </div>
            <button onClick={()=>setIsOpen(true)} className="btn btn-success px-6 py-2 text-lg">
                Send Seller Request
            </button>
            <BecomeSellerModal isOpen={isOpen} setIsOpen={setIsOpen} userEmail={user?.email} ></BecomeSellerModal>
        </div>
    );
};

export default BecomeSeller;