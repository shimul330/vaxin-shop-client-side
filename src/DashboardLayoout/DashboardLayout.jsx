import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import CustomerMenu from '../Component/Dashboard/Sidevar/Menu/CustomerMenu';
import SellerMenu from '../Component/Dashboard/Sidevar/Menu/SellerMenu';
import AdminMenu from '../Component/Dashboard/Sidevar/Menu/AdminMenu';
import useRole from '../hooks/useRole';
import { BounceLoader } from 'react-spinners';


const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, isRoleLoading] = useRole();
  

    if (isRoleLoading) return <BounceLoader />

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar Layout Container */}

            <div className="lg:flex">

                {/* Sidebar for desktop */}

                <aside className="hidden lg:block w-64 bg-white shadow-md p-4 h-screen fixed">

                    <Link to='/'>  <h1 className='text-2xl font-bold'>Dashboard</h1></Link>
                    <div className="space-y-4 mt-6">
                        <nav>

                            {role === 'user' && <CustomerMenu />}
                            {role === 'seller' && <SellerMenu />}
                            {role === 'admin' && <AdminMenu />}


                        </nav>
                    </div>
                </aside>

                {/* Sidebar for mobile with animation */}
                <div
                    className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {/* Overlay background */}
                    <div
                        className="absolute inset-0 bg-transparent"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Sliding Sidebar */}
                    <aside
                        className={`w-64 bg-white shadow-md p-4 h-full absolute left-0 top-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Dashboard</h2>
                            <button onClick={() => setIsOpen(false)}>
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <nav>
                            <CustomerMenu />
                            <SellerMenu />
                            <AdminMenu />
                        </nav>
                    </aside>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 lg:ml-64">
                    {/* Mobile top bar */}
                    <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                        <button onClick={() => setIsOpen(true)}>
                            <FiMenu size={24} />
                        </button>
                    </div>

                    {/* Main content */}
                    <main className="p-4 sm:p-6 space-y-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
