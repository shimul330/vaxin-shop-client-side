import React from 'react';
import { useCart } from '../../Context/CartContext';
import CartPage from './CartPage';

const CartMedicine = () => {
    const { cartItems, removeFromCart } = useCart();
   
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-center mb-2">🛒 Your Cart</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {cartItems.map(item =>
                    <CartPage key={item._id} removeFromCart={removeFromCart} item={item}></CartPage>
                )}
            </div>
        </div>
    );
};

export default CartMedicine;