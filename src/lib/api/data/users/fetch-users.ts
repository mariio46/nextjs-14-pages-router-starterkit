import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { FetchAllUserResponse, FetchSingleUserResponse } from '@/types/api/data/users';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getAllUsers = async () => {
    return await axios.get<FetchAllUserResponse>('/users', getClientSideAxiosHeaders()).then((res) => res.data);
};

const getSingleUser = async (username: string) => {
    return await axios
        .get<FetchSingleUserResponse>(`/users/${username}`, getClientSideAxiosHeaders())
        .then((res) => res.data);
};

export const useFetchAllUsers = () => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllUserResponse, AxiosError>({
        queryKey: [FETCH_ALL_USERS_KEY],
        queryFn: getAllUsers,
    });

    if (isError) {
        console.error({ error_fetch_all_users: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { users: data?.data.users, isLoading, isError, error, status };
};

export const useFetchSingleUser = (username: string) => {
    const { data, isLoading, isError, error, status } = useQuery<FetchSingleUserResponse, AxiosError>({
        queryKey: [FETCH_ALL_USERS_KEY, { username: username }],
        queryFn: () => getSingleUser(username),
    });

    if (isError) {
        console.error({ error_fetch_single_user: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { user: data?.data.user, isLoading, isError, error, status };
};
