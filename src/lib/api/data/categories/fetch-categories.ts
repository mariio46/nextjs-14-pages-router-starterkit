import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FetchAllCategoriesResponse, FetchSingleCategoryResponse } from '@/types/api/data/product-categories';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getAllProductCategories = async () => {
    const { data } = await axios.get<FetchAllCategoriesResponse>('/categories', getClientSideAxiosHeaders());
    return data;
};

export const useFetchAllCategories = () => {
    const { data, isLoading, isError, error, status } = useQuery<FetchAllCategoriesResponse, AxiosError>({
        queryKey: ['categories'],
        queryFn: getAllProductCategories,
    });

    if (isError) {
        console.error({ error_fetch_all_categories: error });
        if (process.env.NODE_ENV === 'production') {
            throw new Error(error.message);
        }
    }

    return { categories: data?.data.categories, isLoading, isError, error, status };
};

const getSingleCategory = async (id: string) => {
    const { data } = await axios.get<FetchSingleCategoryResponse>(`/categories/${id}`, getClientSideAxiosHeaders());
    return data;
};

export const useFetchSingleCategory = (id: string) => {
    const { data, isError, isLoading, error, status } = useQuery<FetchSingleCategoryResponse, AxiosError>({
        queryKey: ['categories', { id: id.toString() }],
        queryFn: () => getSingleCategory(id),
    });

    if (isError) {
        if (process.env.NODE_ENV === 'production') {
            console.error({ error_fetch_single_category: error });
        }
        throw new Error(error.message);
    }

    return { category: data?.data.category, isError, isLoading, error, status };
};

export const useCategoriesFormData = () => {
    const { categories, status } = useFetchAllCategories();

    const formData =
        categories &&
        categories.map((category) => {
            return {
                label: category.name,
                value: category.id.toString(),
            } as const;
        });

    return { formData, status };
};
