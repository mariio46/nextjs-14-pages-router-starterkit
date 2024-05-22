import { useQuery } from '@tanstack/react-query';

import type { FetchAllTypesResponse, FetchSingleTypeResponse } from '@/types/api/data/product-types';
import { type AxiosError } from 'axios';

import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';

const getAllProductTypes = async () => {
    const { data } = await axios.get<FetchAllTypesResponse>('/types', getClientSideAxiosHeaders());
    return data;
};

export const useFetchAllTypes = () => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllTypesResponse, AxiosError>({
        queryKey: ['types'],
        queryFn: getAllProductTypes,
    });

    if (isError) {
        console.error({ error_fetch_all_types: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { types: data?.data.types, isLoading, isError, error, status };
};

const getSingleType = async (id: string) => {
    const { data } = await axios.get<FetchSingleTypeResponse>(`/types/${id}`, getClientSideAxiosHeaders());
    return data;
};

export const useFetchSingleType = (id: string) => {
    const { data, isError, isLoading, error, status } = useQuery<FetchSingleTypeResponse, AxiosError>({
        queryKey: ['types', { id: id.toString() }],
        queryFn: () => getSingleType(id),
    });

    if (isError) {
        if (process.env.NODE_ENV === 'production') {
            console.error({ error_fetch_single_type: error });
        }
        throw new Error(error.message);
    }

    return { type: data?.data.type, isError, isLoading, error, status };
};
