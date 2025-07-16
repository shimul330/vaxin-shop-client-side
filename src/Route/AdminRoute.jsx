
import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const [role, isRoleLoading] = useRole();
 

    if(isRoleLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(role === 'admin') return children;
     return <Navigate to='/'  ></Navigate>
    
};

export default AdminRoute;