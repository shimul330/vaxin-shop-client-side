import React from 'react';
import CountUp from 'react-countup';

const CounterSection = () => {
    const stats = [
        { id: 1, label: "Total Products", end: 1200 },
        { id: 2, label: "Total Sellers", end: 300 },
        { id: 3, label: "Total Users", end: 4500 },
        { id: 4, label: "Total Orders", end: 980 },
    ];

    return (
        <div className="bg-gradient-to-r from-green-50 to-green-100 py-10 px-4">
            <h1 className='text-2xl text-center font-bold mb-4'>Counter Section</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-center">
                {stats.map(stat => (
                    <div key={stat.id} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                        <h2 className="text-4xl font-bold text-green-600 mb-2">
                            <CountUp end={stat.end} duration={2} />
                        </h2>
                        <p className="text-gray-600 text-lg">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CounterSection;
