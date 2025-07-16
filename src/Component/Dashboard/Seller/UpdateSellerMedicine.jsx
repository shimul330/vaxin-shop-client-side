import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const UpdateSellerMedicine = ({ isOpen, setIsOpen, medicine, onSubmit }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: medicine
    });

    // ⬇️ Reset form when medicine changes
    useEffect(() => {
        if (medicine) {
            reset(medicine);
        }
    }, [medicine, reset]);

    const handleClose = () => {
        setIsOpen(false);
        reset(); // optional: clear the form
    };

    return (
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">
                            Update Medicine
                        </DialogTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Category Dropdown */}
                                <div>
                                    <select
                                        {...register("category", { required: true })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Tablet">Tablet</option>
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
                                        <option value="Renata">Renata</option>
                                        <option value="Aristopharma">Aristopharma Ltd</option>
                                        <option value="Radiant">Radiant</option>
                                    </select>
                                    {errors.company && <p className="text-red-500 text-sm">Company is required</p>}
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <textarea
                                        {...register("description")}
                                        placeholder="Short Description"
                                        className="textarea textarea-bordered w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button type="submit" className="btn btn-success">Update</button>
                                <button type="button" onClick={handleClose} className="btn btn-error">Cancel</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default UpdateSellerMedicine;
