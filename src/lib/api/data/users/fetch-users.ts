import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { User } from '@/types/api/feature/users';
import { useQuery } from '@tanstack/react-query';

const getAllUsers = async () => {
    return await axios.get('/users', getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useFetchAllUsers = () => {
    const { data, isLoading, isError, error } = useQuery<User[]>({
        queryKey: [FETCH_ALL_USERS_KEY],
        queryFn: getAllUsers,
    });

    return { data, isLoading, isError, error };
};
