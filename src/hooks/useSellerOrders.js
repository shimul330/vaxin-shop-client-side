// src/hooks/useSellerOrders.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSellerOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['seller-orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller-orders/${user.email}`);
            return res.data;
        }
    });

    return { orders, isLoading };
};

export default useSellerOrders;
