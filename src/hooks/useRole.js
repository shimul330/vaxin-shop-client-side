import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useAuth();
    // const [role, setRole] = useState(null);
    // const [isRoleLoading, setIsRoleLoading] = useState(true);
    const axiosSucure = useAxiosSecure();

    const {data:role, isLoading:isRoleLoading} = useQuery({
        queryKey: ['role', user?.email ] ,
        enabled:!loading && !!user?.email,
        queryFn: async ()=>{
              const { data } = await axiosSucure(`${import.meta.env.VITE_api_url}/users/role/${user?.email}`)
              return data;
        }
        
    });
    console.log(role, isRoleLoading)


    // useEffect(() => {

    //     const fetchUserRole = async () => {
    //         if(!user) return setIsRoleLoading(false)
    //         try {
              
    //             setRole(data?.role);
                
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //         finally{
    //             setIsRoleLoading(false)
    //         }
    //     }
    //     fetchUserRole();
    // }, [user, axiosSucure])


    return [role?.role, isRoleLoading]

}

export default useRole;