
import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';

const SellerRoute = ({children}) => {
    const [role, isRoleLoading] = useRole();
 

    if(isRoleLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(role === 'seller') return children;
     return <Navigate to='/'  ></Navigate>
    
};

export default SellerRoute;