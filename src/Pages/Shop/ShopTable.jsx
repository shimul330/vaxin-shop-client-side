
import { Link } from 'react-router';
import { useCart } from '../../Context/CartContext';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';



const ShopTable = ({ medicine, index, role }) => {
    
    const { user } = useAuth();
   

    const { _id } = medicine;
    const { addToCart } = useCart();

   

    return (
        <tr>
            <th className="text-[13px]"> {index} </th>
            <td className="text-[13px]"> {medicine.itemName} </td>
            <td className="text-[13px]">{medicine.genericName}</td>
            <td className="text-[13px]">{medicine.company}</td>
            <td className="text-[13px]">{medicine.category}</td>
            <td className="text-[13px]">{medicine.price}</td>
            <td>
                <div className="flex gap-2">
                    <button
                    disabled={!user  || role !== 'user'}
                        onClick={() => {
                            if (user) {
                                addToCart(medicine);
                            } else {
                               
                                toast.warning("Please login to add items to cart")
                            }
                        }}
                        className={`btn btn-sm btn-success ${user ? 'hover:cursor-pointer' : 'cursor-not-allowed'}`}
                        // disabled={!user} // disable button functionality
                    >
                        {user ? 'Select' : 'Select for Login'}
                    </button>

                    <Link to={`/medicines/${_id}`}>
                        <button className="btn btn-sm btn-info text-white">Details</button>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default ShopTable;