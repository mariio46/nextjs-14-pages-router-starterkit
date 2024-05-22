import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { FetchAllRolesResponse, FetchSingleRoleResponse } from '@/types/api/data/roles';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getAllRoles = async (): Promise<FetchAllRolesResponse> => {
    return await axios.get<FetchAllRolesResponse>('/roles', getClientSideAxiosHeaders()).then((res) => res.data);
};

const getSingleRole = async (id: string): Promise<FetchSingleRoleResponse> => {
    return await axios.get(`/roles/${id}`, getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useFetchAllRoles = () => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllRolesResponse, AxiosError>({
        queryKey: [FETCH_ALL_ROLES_KEY],
        queryFn: getAllRoles,
    });

    if (isError) {
        console.error(error);
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { roles: data?.data.roles, isLoading, isError, status };
};

export const useFetchSingleRole = (id: string) => {
    const { data, isLoading, isError, error, status } = useQuery<FetchSingleRoleResponse, AxiosError>({
        queryKey: [FETCH_ALL_ROLES_KEY, { id: id.toString() }],
        queryFn: () => getSingleRole(id),
    });

    if (isError) {
        console.error(error);
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { role: data?.data.role, isLoading, isError, status };
};
