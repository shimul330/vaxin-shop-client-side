import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';

const CatagoryCardSection = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        }
    });

    const handleCardClick = (categoryName) => {
        navigate(`/categories/${categoryName}`);
    };

    if (isLoading) return <BounceLoader />

    return (
        <div>
            <h1 className='mb-4 text-2xl text-center font-bold'>Catagory Medicine</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">

                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(category.name)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-4 text-center hover:bg-gray-50"
                    >
                        <div className="px-4">
                            <img
                                src={category.image}
                                alt={category.name}
                                className=" rounded-2xl mx-auto mb-3 object-contain"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-green-600">{category.name}</h3>
                        <p className="text-gray-600">Total: {category.count} Medicines</p>
                    </div>
                ))}
            </div>
    
        </div>
    )

};

export default CatagoryCardSection;