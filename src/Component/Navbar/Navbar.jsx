import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import logoImg from '../../assets/vaccine logo.jpg'
import { useLanguage } from '../../Context/LanguageContext';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useCart } from '../../Context/CartContext';

const Navbar = () => {
    const { language, setLanguage, t, } = useLanguage();
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();


    const handleLogOut = () => {

        logOut().then(() => {
            clearCart();
            toast.success("Logout Succesfull!")
            navigate('/')
        }).catch((error) => {
            toast.error("Logout failed!")
        });

    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2">
                    <img src={logoImg} alt="Vaxin Logo" className="h-8 w-8" />
                    <h1 className="text-xl font-bold text-gray-800"><span className='text-blue-700'>V</span>axin</h1>
                </div>

                {/* Center: Nav Links */}
                <div className="hidden md:flex space-x-6">

                    <NavLink to='/' className='font-medium'>{t.home}</NavLink>
                    <NavLink to='/shop' className='font-medium'>{t.shop}</NavLink>
                </div>

                {/* Right: Cart, Language, Join Us */}
                <div className="flex items-center space-x-4">
                    {/* cart icon */}

                    <div className="relative">
                        <Link to="/cart">
                            <div className="relative text-gray-600 hover:text-blue-600 text-xl">
                                <FaShoppingCart size={22} />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs px-2 rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative">
                        <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="EN">EN</option>
                            <option value="BN">BN</option>
                        </select>
                    </div>


                    {/* If user is logged in */}
                    {
                        user?.photoURL ? (
                            <div className="relative">
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-400"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                                {
                                    isOpen && (
                                        <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md z-50">
                                            <Link
                                                to="/update-profile"
                                                className="block text-blue-700 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                Update Profile
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                className="block text-blue-700 px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogOut}
                                                className="w-full text-blue-700 text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            // If no user logged in
                            <Link
                                to='/login'
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-semibold"
                            >
                                {t.join}
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;