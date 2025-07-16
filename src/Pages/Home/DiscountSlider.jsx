import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BounceLoader } from 'react-spinners';

const DiscountSlider = () => {
    const axiosSecure = useAxiosSecure();

    const { data: discounted, isLoading } = useQuery({
        queryKey: ['discount-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/discount-products');
            return res.data;
        }
    });

    if (isLoading) return <BounceLoader />

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl text-center font-bold text-green-700 mb-4">Discounted Products</h2>
            <Swiper
                modules={[FreeMode]}
                spaceBetween={20}
                freeMode={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                }}
            >
                {discounted.map(product => (
                    <SwiperSlide key={product._id}>
                        <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition">
                            <img src={product.image} alt={product.itemName} className="h-32 mx-auto mb-2 object-contain" />
                            <h3 className="text-lg font-semibold">{product.itemName}</h3>
                            <p className="text-gray-600 line-through">${product.price}</p>
                            <p className="text-green-600 font-bold">
                                ${product.price - (product.price * product.discount / 100)} ({product.discount}% off)
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DiscountSlider;
