import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import BannerTable from '../../../Component/Dashboard/Admin/BannerTable';
import { BounceLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';

const BannerAdvertise = () => {
    const axiosSecure = useAxiosSecure();
    const auth = getAuth();

    const { data: ads, isLoading } = useQuery({
        queryKey: ['all-ads'],
        queryFn: async () => {
            const currentUser = auth.currentUser;
            const token = await currentUser.getIdToken();
            const res = await axiosSecure.get('/advertisements',{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            
            return res.data;
        }
    });

    if (isLoading) return <BounceLoader />
    

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Banner Advertisements</h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Seller Email</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {
                        ads?.map((ad, index)=> <BannerTable key={ad?._id} index={index} ad={ad}></BannerTable> )
                      }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BannerAdvertise;
