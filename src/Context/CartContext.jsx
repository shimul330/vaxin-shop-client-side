import { createContext, useState, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/cart/${user.email}`)
                .then(res => setCartItems(res.data));
        }
    }, [user]);

    // CART ADD
    const addToCart = async (medicine) => {
        const { _id, ...rest } = medicine;

        const item = {
            email: user.email,
            ...rest,
        };

        try {
            const res = await axios.post('http://localhost:3000/cart', item);

            if (res.data.insertedId) {
                const updated = await axios.get(`http://localhost:3000/cart/${user.email}`);
                setCartItems(updated.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };


    // CART DELETE
    const removeFromCart = async (id) => {

        await axios.delete(`http://localhost:3000/cart/${id}`);
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// useCart Hook
export const useCart = () => {
    return useContext(CartContext);
};
