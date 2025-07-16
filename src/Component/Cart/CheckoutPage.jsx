import React from 'react';
import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import './CheckoutForm.css'

const stripePromise = loadStripe(import.meta.env.VITE_payment_pk_key);

const CheckoutPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const { item, quantity,  grandTotal, } = location.state || {};
    // console.log(user)
    return (
        <div className="max-w-md mx-auto mb-10 mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Checkout Page</h2>

            <p><strong>Item Name:</strong> {item?.itemName}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Price per unit:</strong> ${item?.price}</p>
            <p><strong>Discount:</strong> ${item?.discount}</p>
            <p className='text-blue-700'><strong>Sellar Info: </strong> </p>
            <hr />
            <p><strong> Name:</strong> {item?.seller?.name}</p>
            <p><strong> Email:</strong> {item?.seller?.email}</p>

            <p className='text-blue-700'><strong>Customer Info: </strong> </p>
            <hr />
            <p><strong> Name:</strong> {user?.displayName}</p>
            <div className='flex items-center gap-2'>
                <p><strong> Email: {user?.email} </strong> </p>
                <img className='w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
            </div>

            <hr className='mb-3' />

            <p className="text-xl font-semibold text-green-600 mb-6">
                    Grand Total: ${ grandTotal}
                </p>
            {/* stripe payment system */}

            <Elements stripe={stripePromise}>
                <CheckoutForm quantity={quantity}  grandTotal={ grandTotal} item={item} />
            </Elements>

            
        </div>

    );
};

export default CheckoutPage;