import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
    FetchAllPermissionResponse,
    FetchSinglePermissionResponse,
    PermissionIndexType,
} from '@/types/api/data/permissions';

import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { MultipleSelectOption } from '@/lib/schema/multiple-select-option-schema';
import { capitalize } from '@/lib/utils';

const fetchAllPermissions = async (): Promise<FetchAllPermissionResponse> => {
    return await axios
        .get<FetchAllPermissionResponse>('/permissions', getClientSideAxiosHeaders())
        .then((res) => res.data);
};

const fetchSinglePermission = async (id: string): Promise<FetchSinglePermissionResponse> => {
    return await axios
        .get<FetchSinglePermissionResponse>(`/permissions/${id}`, getClientSideAxiosHeaders())
        .then((res) => res.data);
};

type UseFetchAllPermissionsReturn = {
    permissions?: PermissionIndexType[];
    isLoading: boolean;
    isError: boolean;
    status: 'pending' | 'error' | 'success';
};

export const useFetchAllPermissions = (): UseFetchAllPermissionsReturn => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllPermissionResponse, AxiosError>({
        queryKey: ['permissions'],
        queryFn: fetchAllPermissions,
    });

    if (isError) {
        console.log(error);
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { permissions: data?.data.permissions, isLoading, isError, status };
};

export const usePermissionFormData = () => {
    const { permissions } = useFetchAllPermissions();

    const formData: MultipleSelectOption[] | undefined =
        permissions &&
        permissions.map((permission) => {
            return {
                label: capitalize(permission.name),
                value: permission.name,
            };
        });

    return formData;
};

export const useFetchSinglePermission = (id: string) => {
    const { data, isError, isLoading, error, status } = useQuery<FetchSinglePermissionResponse, AxiosError>({
        queryKey: ['permissions', { id: id.toString() }],
        queryFn: () => fetchSinglePermission(id),
    });

    if (isError) {
        console.log({ error_fetch_single_permission: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { permission: data?.data.permission, isLoading, isError, status };
};
