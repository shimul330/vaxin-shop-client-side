import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ShopTable from './ShopTable';
import useRole from '../../hooks/useRole';
import { BounceLoader } from 'react-spinners';

const Shop = () => {
    const medicines = useLoaderData();
    const [role, isRoleLoading] = useRole();
    const [searchText, setSearchText] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const medicinesData = medicines.filter(medicine => {
        const search = searchText.toLowerCase();
        return (
            medicine.itemName.toLowerCase().includes(search) ||
            medicine.company.toLowerCase().includes(search)

        )
    }
    );

    const sortedData = [...medicinesData].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);


        if (sortOrder === 'low') return priceA - priceB;
        if (sortOrder === 'high') return priceB - priceA;
        return 0;
    });


    if (isRoleLoading) return (
        <div className="flex justify-center items-center py-10">
            <BounceLoader />
        </div>
    );

    return (
        <div className='py-3'>
            {/*  Search and Sort */}
            <div className="flex flex-col md:flex-row gap-4 justify-end mb-7 mt-3 px-4">
                <div className="relative w-full md:w-1/3">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        {/* <IoMdSearch /> */}
                    </span>
                    <input
                        type="text"
                        placeholder="Search by medicine name, or company name"
                        className="input input-bordered w-full pl-10 pr-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                {/* shor */}
                <div>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="select select-bordered h-[44px] shadow-2xl md:h-[44px]"

                    >
                        <option value="">Sort by Price</option>
                        <option value="low">Low Price</option>
                        <option value="high">High price</option>
                    </select>
                </div>
            </div>

            {/*  Medicine Table */}
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
                        {sortedData.map((medicine, index) => (
                            <ShopTable key={medicine._id} role={role} index={index} medicine={medicine} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Shop;