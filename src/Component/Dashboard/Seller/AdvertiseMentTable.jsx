import React from 'react';

const AdvertiseMentTable = ({ad, index}) => {
    return (
        <tr className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
            <td className="px-4 py-3">
                <img
                    src={ad.image}
                    alt="ad"
                    className="w-16 h-16 object-cover rounded-md border"
                />
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">{ad.description}</td>
            <td className="px-4 py-3 text-sm">
                <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${ad.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                >
                    {ad.status}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(ad.createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
};

export default AdvertiseMentTable;