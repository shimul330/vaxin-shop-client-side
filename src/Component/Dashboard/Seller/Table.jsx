import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
const Table = ({ medicine, index, onEdit }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const auth = getAuth();

    const deleteMedicineMutation = useMutation({
        mutationFn: async (id) => {
            const currentUser = auth.currentUser;
            const token = await currentUser.getIdToken();
            const res = await axiosSecure.delete(`/delete-medicine/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Medicine deleted successfully!");
            queryClient.invalidateQueries(['seller-medicines']);
        },
        onError: (error) => {
            toast.error("Delete failed! Try again.");
            console.error("Delete Error:", error);
        }
    });


    const handleDeleteMedicine = (id) => {
        deleteMedicineMutation.mutate(id)
    }
    return (
        <tr className="hover:bg-gray-50 transition duration-200">
            <th className="px-4 py-2 text-left text-sm text-gray-700">{index + 1}</th>
            <td className="px-4 py-2 text-sm text-gray-700">{medicine.itemName}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{medicine.genericName}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{medicine.company}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{medicine.category}</td>
            <td className="px-4 py-2 text-sm text-gray-700">${medicine.price}</td>
            <td className="px-4 py-2">
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 rounded-md bg-green-500 text-white text-xs hover:bg-green-600 transition duration-150"
                        onClick={() => onEdit(medicine)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteMedicine(medicine?._id)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600 transition duration-150"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>

    );
};

export default Table;
