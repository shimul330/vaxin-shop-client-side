import React from 'react';
import Banner from './Banner';
import CatagoryCardSection from './CatagoryCardSection';
import DiscountSlider from './DiscountSlider';
import CounterSection from './CounterSection';

const Home = () => {
    return (
        <div>
            <div className='mt-5 mb-5'>
                <Banner></Banner>
                <div className='mt-5'>
                    <CatagoryCardSection></CatagoryCardSection>
                </div>
                <div className='mt-5'>
                   <DiscountSlider></DiscountSlider>
                </div>
                <div className='mt-5'>
                  <CounterSection></CounterSection>
                </div>
            </div>
        </div>
    );
};

export default Home;