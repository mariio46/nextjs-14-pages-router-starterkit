import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FetchAllProductsResponse, FetchSingleProductResponse } from '@/types/api/data/products';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getAllProducts = async () => {
    const { data } = await axios.get<FetchAllProductsResponse>('/products', getClientSideAxiosHeaders());
    return data;
};

export const useFetchAllProducts = () => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllProductsResponse, AxiosError>({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    if (isError) {
        console.error({ error_fetch_all_products: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { products: data?.data.products, isLoading, isError, error, status };
};

const getSingleProduct = async (id: string) => {
    const { data } = await axios.get<FetchSingleProductResponse>(`/products/${id}`, getClientSideAxiosHeaders());
    return data;
};

export const useFetchSingleProduct = (id: string) => {
    const { data, isError, isLoading, error, status } = useQuery<FetchSingleProductResponse, AxiosError>({
        queryKey: ['products', { id: id.toString() }],
        queryFn: () => getSingleProduct(id),
    });

    if (isError) {
        if (process.env.NODE_ENV === 'production') {
            console.error({ error_fetch_single_product: error });
        }
        throw new Error(error.message);
    }

    return { product: data?.data.product, isError, isLoading, error, status };
};
