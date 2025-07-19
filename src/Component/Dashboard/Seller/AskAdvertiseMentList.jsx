import React from 'react';
import AdvertiseMentTable from './AdvertiseMentTable';

const AskAdvertiseMentList = ({ads}) => {

    return (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-blue-300 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {
                        ads.map((ad, index)=> <AdvertiseMentTable key={ad?._id} index={index} ad={ad}></AdvertiseMentTable> )
                    }

                </tbody>
            </table>

            {ads.length === 0 && (
                <div className="p-4 text-center text-gray-500">No advertisement found.</div>
            )}
        </div>
    );
};

export default AskAdvertiseMentList;