import React from 'react';
import { useLoaderData } from 'react-router';
import ShopTable from './ShopTable';
import useRole from '../../hooks/useRole';
import { BounceLoader } from 'react-spinners';

const Shop = () => {
    const medicines = useLoaderData();
     const [role, isRoleLoading] = useRole();


      if (isRoleLoading) return (
        <div className="flex justify-center items-center py-10">
            <BounceLoader />
        </div>
    );

    return (
        <div className='py-3'>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Generic Name</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Unit Price</th>
                            <th>Details</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            medicines.map((medicine, index) => <ShopTable key={medicine._id} role={role} index={index}  medicine={medicine}></ShopTable>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Shop;