import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { FetchAllRolesResponse, FetchSingleRoleResponse, RoleShowType } from '@/types/api/data/roles';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UseFetchAllRolesReturn = {
    data: FetchAllRolesResponse | undefined;
    isLoading: boolean;
    isError: boolean;
};

type UseFetchSingleRoleReturn = {
    role: RoleShowType | undefined;
    isLoading: boolean;
    isError: boolean;
};

const getAllRoles = async (): Promise<FetchAllRolesResponse> => {
    return await axios.get<FetchAllRolesResponse>('/roles', getClientSideAxiosHeaders()).then((res) => res.data);
};

const getSingleRole = async (id: string): Promise<FetchSingleRoleResponse> => {
    return await axios.get(`/roles/${id}`, getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useFetchAllRoles = (): UseFetchAllRolesReturn => {
    const { data, isLoading, isError, error } = useQuery<FetchAllRolesResponse, AxiosError>({
        queryKey: [FETCH_ALL_ROLES_KEY],
        queryFn: getAllRoles,
    });

    if (isError) console.error(error);

    return { data, isLoading, isError };
};

export const useFetchSingleRole = (id: string): UseFetchSingleRoleReturn => {
    const { data, isLoading, isError, error } = useQuery<FetchSingleRoleResponse, AxiosError>({
        queryKey: [FETCH_ALL_ROLES_KEY, `role-with-id-${id}`],
        queryFn: () => getSingleRole(id),
    });

    if (isError) {
        console.log(error);
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { role: data?.data, isLoading, isError };
};
