import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { SingleUserType, UsersType } from '@/types/api/data/users';
import { ApiResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';

const getAllUsers = async () => {
    return await axios.get('/users', getClientSideAxiosHeaders()).then((res) => res.data);
};

const getSingleUser = async (username: string) => {
    return await axios.get(`/users/${username}`, getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useFetchAllUsers = () => {
    const { data, isLoading, isError, error } = useQuery<UsersType[]>({
        queryKey: [FETCH_ALL_USERS_KEY],
        queryFn: getAllUsers,
    });

    return { data, isLoading, isError, error };
};

export const useFetchSingleUser = (username: string) => {
    const { data, isLoading, isError, error } = useQuery<ApiResponse<{ user: SingleUserType }>>({
        queryKey: [username],
        queryFn: () => getSingleUser(username),
    });

    return { data, isLoading, isError, error };
};
