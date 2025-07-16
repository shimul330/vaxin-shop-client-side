import React from 'react';
import { Outlet } from 'react-router';
import authLottie from '../../src/assets/lottie/authLottie.json'
import Lottie from 'lottie-react';

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center bg-gray-200   px-4">
            <div className=" flex flex-col lg:flex-row-reverse  rounded-2xl w-11/12 mx-auto  ">
                
                {/* Image Section */}
                <div className="flex-1 flex items-center justify-center mb-6 lg:mb-0">
                    <Lottie animationData={authLottie} loop={true}></Lottie>
                </div>

                {/* Form Section */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
