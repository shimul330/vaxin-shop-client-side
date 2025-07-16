import React, { useState } from 'react';

import { useNavigate } from 'react-router';




const CartPage = ({ item, removeFromCart }) => {

   
    const navigate = useNavigate();


    const {
        _id,
        itemName,
        category,
        company,
        discount,
        price,
        image,
    } = item;
   
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const totalPrice = price * quantity;
    const totalDiscount = discount ? discount : 0;
    const grandTotal = (totalPrice - totalDiscount).toFixed(2);

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* 🖼️ Image */}
            {image && (
                <img
                    src={image}
                    alt={itemName}
                    className="w-full h-52 object-cover"
                />
            )}

            {/* 📄 Text Content */}
            <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{itemName}</h2>
                <p className="text-sm text-gray-600">
                    Category: <span className="text-gray-700">{category}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Company: <span className="text-gray-700">{company}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Price per unit: <span className="text-green-600 font-semibold">${price}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Discount: <span className="text-green-600 font-semibold">${discount}</span>
                </p>
                <hr />
                {/* 🔢 Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={handleDecrease}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-lg"
                    >
                        −
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-lg"
                    >
                        +
                    </button>
                </div>

                {/* 💵 Total Price */}
                <p className="text-sm text-gray-600 mt-2">
                    Total Price: <span className="text-blue-600 font-bold">${totalPrice}</span>
                </p>

                {/* 🔘 Buttons Side by Side */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => removeFromCart(_id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            navigate('/checkout', {
                                state: {
                                    item,
                                    quantity,
                                     grandTotal,

                                },
                            })
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
