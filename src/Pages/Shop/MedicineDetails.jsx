import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';


const MedicineDetails = () => {
    const medicineData = useLoaderData();

    const { user } = useAuth();

    const {
        category,
        company,
        description,
        discount,
        genericName,
        image,
        itemName,
        price,
        unit,
        seller

    } = medicineData;


    return (
        <div className="max-w-5xl mx-auto my-10 p-6 bg-base-100 rounded-xl shadow-lg">
            <Link to='/shop'>
                <FaArrowLeft className='text-blue-600' size={20} />
            </Link>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center items-center">
                    {image ? (
                        <img
                            src={image}
                            alt={itemName}
                            className="rounded-lg w-full max-h-[400px] object-cover"
                        />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
                            No Image Available
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 space-y-4">

                    <h2 className="text-3xl font-bold text-primary">{itemName}</h2>
                    <div className='flex items-center gap-2'>
                        <img className='w-10 h-10 rounded-full' src={seller?.image} alt="" />

                        <p className="text-gray-600"><span className="font-semibold">Seller:</span>
                            {seller?.name}</p>
                    </div>
                    <p className="text-gray-600"><span className="font-semibold">Generic Name:</span> {genericName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Company:</span> {company}</p>
                    <p className="text-gray-600"><span className="font-semibold">Category:</span> {category}</p>
                    <p className="text-gray-600"><span className="font-semibold">Unit:</span> {unit}</p>
                    <p className="text-gray-600"><span className="font-semibold">Price:</span> <span className="text-green-600 font-bold">${price}</span></p>
                    <p className="text-gray-600"><span className="font-semibold">Discount:</span> <span className="text-green-600 font-bold">${discount}</span></p>
                    {
                        discount > 0 && (
                            <p className="text-red-500"><span className="font-semibold">Discount:</span> {discount}% Off</p>
                        )
                    }
                    <p className="text-gray-700 mt-4">
                        <span className="font-semibold block mb-1">Description:</span>
                        {description}
                    </p>


                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
