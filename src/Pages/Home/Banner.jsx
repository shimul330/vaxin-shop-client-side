import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BounceLoader } from 'react-spinners';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// 🔽 Local banner images
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const Banner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['homepage-banner'],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved-ads');
            return res.data;
        }
    });

    // Local fallback banners
    const defaultBanners = [
        { image: banner1 },
        { image: banner2 },
        { image: banner3 }
    ];

    //  Final banners: either seller ads or fallback
    const finalBanners = banners.length > 0 ? banners : defaultBanners;

    if (isLoading) {
        return <p className="text-center py-6 text-blue-600 font-semibold"><BounceLoader /></p>;
    }

    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay={true}
                interval={2000}
                showStatus={false}
                showArrows={false}
            >
                {finalBanners.map((banner, idx) => (
                    <div key={idx}>
                        <img
                            src={banner.image}
                            alt={`Banner ${idx + 1}`}
                            className="w-full rounded-2xl h-[250px] md:h-[350px] lg:h-[450px] object-cover"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
