import React from 'react';

const AddMedicineForm = ({ register, errors,handleMedicineImageUpload }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div>
                <input
                    {...register("itemName", { required: true })}
                    placeholder="Item Name"
                    className="input input-bordered w-full"
                />
                {errors.itemName && <p className="text-red-500 text-sm">Item Name is required</p>}
            </div>

            {/* Generic Name */}
            <div>
                <input
                    {...register("genericName", { required: true })}
                    placeholder="Generic Name"
                    className="input input-bordered w-full"
                />
                {errors.genericName && <p className="text-red-500 text-sm">Generic Name is required</p>}
            </div>

            {/* Mass Unit */}
            <div>
                <input
                    {...register("unit", { required: true })}
                    placeholder="Mass Unit (Mg or ML)"
                    className="input input-bordered w-full"
                />
                {errors.unit && <p className="text-red-500 text-sm">Mass unit is required</p>}
            </div>

            {/* Price */}
            <div>
                <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                    placeholder="Per Unit Price"
                    className="input input-bordered w-full"
                />
                {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
            </div>

            {/* Discount */}
            <div>
                <input
                    type="number"
                    step="1"
                    {...register("discount")}
                    placeholder="Discount (%)"
                    defaultValue={0}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Image Upload */}
            <div>
                <input
                    type="file"
                    onChange={handleMedicineImageUpload}
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    />
                    
                
            </div>

            {/* Category Dropdown */}
            <div>
                <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Category</option>
                    <option value="Tabte">Table</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Others">Others</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
            </div>

            {/* Company Dropdown */}
            <div>
                <select
                    {...register("company", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Company</option>
                    <option value="Square">Square</option>
                    <option value="Beximco">Beximco</option>
                    <option value="ACI">ACI</option>
                    <option value="Incepta">Incepta</option>
                    <option value="Renata">Renata </option>
                    <option value="Aristopharma">Aristopharma Ltd</option>
                    <option value="Radiant">Radiant</option>
                </select>
                {errors.company && <p className="text-red-500 text-sm">Company is required</p>}
            </div>
            {/* Full width Short Description */}
            <div className="mt-4">
                <textarea
                    {...register("description")}
                    placeholder="Short Description"
                    className="textarea textarea-bordered w-full"
                />
            </div>
        </div>


    );
};

export default AddMedicineForm;