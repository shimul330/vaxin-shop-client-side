import { createContext, useState, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();



    const fetchCart = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) return;

            const token = await currentUser.getIdToken();

            const res = await axios.get(`https://vaxin-website-server-side.vercel.app/cart/${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCartItems(res.data);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        }
    };

    useEffect(() => {
        if (!user || !user.email) return;

 
        fetchCart();
    }, [user]);


    // useEffect(() => {
    //     if (!user || !user.email) return; 

    //     const fetchCart = async () => {
    //         try {
    //             const res = await axios.get(`https://vaxin-website-server-side.vercel.app/cart/${user.email}`);
    //             setCartItems(res.data);
    //         } catch (err) {
    //             console.error('Failed to fetch cart:', err);
    //         }
    //     };

    //     fetchCart();
    // }, [user]);
    // CART ADD
    const addToCart = async (medicine) => {
        const { _id, ...rest } = medicine;

        const item = {
            email: user.email,
            ...rest,
        };

        try {
            const res = await axios.post('https://vaxin-website-server-side.vercel.app/cart', item);

            if (res.data.insertedId) {
                const updated = await axios.get(`https://vaxin-website-server-side.vercel.app/cart/${user.email}`);
                setCartItems(updated.data);
            }
        } catch (err) {
            toast.error(err)
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };


    // CART DELETE
    const removeFromCart = async (id) => {

        await axios.delete(`https://vaxin-website-server-side.vercel.app/cart/${id}`,)

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
