import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import ManageCatagoryTable from '../../../Component/Dashboard/Admin/ManageCatagoryTable';


const ManageCatagory = () => {
    const axiosSecure = useAxiosSecure();
  
    const { data: medicines, isLoading } = useQuery({
        queryKey: ["medicines"],
        queryFn: async () => {
          
            const { data } = await axiosSecure('/medicines');
            return data;
        }

    })

    if (isLoading) return <BounceLoader />

    return (
        <div className='container mx-auto px-4 sm:px-8'>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Serial No</th>
                            <th>Catagory Image</th>
                            <th>Item Name</th>
                            <th>Category Name</th>
                            <th>Actions</th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines.map((medicine, index) => <ManageCatagoryTable key={medicine?._id} index={index} medicine={medicine}  ></ManageCatagoryTable>)
                        }


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageCatagory;