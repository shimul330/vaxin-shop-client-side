import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CheckoutForm = ({ quantity,  grandTotal, item }) => {
    
    const { user } = useAuth();
    const navigate = useNavigate();


    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        const getClientSecret = async () => {
            // server request.....
            const { data } = await axiosSecure.post('/client-payment-secret', {
                quantity: quantity,
                medicineId: item?._id
            })
            setClientSecret(data.clientSecret)

        }
        getClientSecret();
    }, [axiosSecure])

    const handleSubmit = async (event) => {
        setProcessing(true)
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
     
            setError(error.message)
            setProcessing(false)
            return
        } else {
        
            setError(null)
        }
        // taka pay
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        })

        if (result?.error) {
            setError(result?.error?.message)
            return
        }
        if (result?.paymentIntent?.status === "succeeded") {

            const { _id, ...itemDataWithoutId } = item;

            const paymentData = {
                ...itemDataWithoutId,
                itemId: _id,
                customer:{
                    email: user?.email,
                    name:user?.name
                },
                transactionId: result?.paymentIntent?.id,
                quantity: quantity,
                totalAmount:  grandTotal,
                paymentStatus: "pending",
                paidAt: new Date().toISOString(),
            };
            //save data in db
            try {
                const { data } = await axiosSecure.post('/order', paymentData)
                if (data?.insertedId) {
                    toast.success("order Successfully!")
                     navigate(`/invoice/${data.insertedId}`);
                    
                }


            }
            catch (err) {
               toast.error(err)
            }
            finally {
                setProcessing(false)
                setError(null)
            }

            // update product quantity in db from plant collection
        }

       
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {error && <p className='text-[12px] text-red-600'> {error} </p>}

            <button className="bg-purple-600 hover:bg-purple-700 mt-2 text-white px-4 py-2 rounded-md transition-all duration-200" type="submit" disabled={!stripe || processing}>
                {processing ? <ClipLoader size={20} color='#fffafa' /> : "Procced to payment"}

            </button>
        </form>
    );
};

export default CheckoutForm;