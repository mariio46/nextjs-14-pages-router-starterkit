import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { BaseProductType } from '@/types/api/data/products';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useRouter } from 'next/router';

type CreateProductResponse = ApiResponse<{ product: BaseProductType }>;

type CreateProductErrorResponse = AxiosError<
    ApiValidationErrorResponse<{
        name?: string[];
        description?: string[];
        price?: string[];
        category?: string[];
        type?: string[];
    }>
>;

const createProductFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.'),
    description: z
        .string({ required_error: 'The description field is required.' })
        .min(25, 'The description field must be at least 25 characters.'),
    price: z.coerce
        .number({
            required_error: 'The price field is required.',
            invalid_type_error: 'The price field must be a number.',
        })
        .min(500, 'The price field must be at least Rp 500')
        .max(100000, 'The price field may not be greater than Rp 100.000')
        .default(500),
    category: z.string({ required_error: 'The category field is required.' }),
    type: z.string({ required_error: 'The type field is required.' }),
});

type CreateProductFormFields = z.infer<typeof createProductFormSchema>;

const submitProductToServer = async (values: CreateProductFormFields) => {
    const { data } = await axios.post<CreateProductResponse>('/products/store', values, getClientSideAxiosHeaders());
    return data;
};

const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    // prettier-ignore
    const { mutateAsync, isPending } = useMutation<CreateProductResponse, CreateProductErrorResponse, CreateProductFormFields>({
        mutationKey: ['create-product'],
        mutationFn: submitProductToServer,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['types'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useCreateProductHandler = (form: UseFormReturn<CreateProductFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: CreateProductResponse) => {
        form.reset();

        toast({
            title: 'Success',
            description: 'Product has been created successfully.',
        });

        router.push('/products');

        return response;
    };

    const handleError = (error: CreateProductErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors?.name) {
                form.setError('name', { message: errors.name[0] }, { shouldFocus: true });
            }
            if (errors?.description) {
                form.setError('description', { message: errors.description[0] }, { shouldFocus: true });
            }
            if (errors?.price) {
                form.setError('price', { message: errors.price[0] }, { shouldFocus: true });
            }
            if (errors?.category) {
                form.setError('category', { message: errors.category[0] }, { shouldFocus: true });
            }
            if (errors?.type) {
                form.setError('type', { message: errors.type[0] }, { shouldFocus: true });
            }
        } else {
            console.log({ error });
            toast({
                title: 'Failed',
                description: error.message,
                variant: 'destructive',
                duration: 10000,
            });
        }
    };

    return { handleSuccess, handleError };
};

export const useCreateProduct = () => {
    const form = useForm<CreateProductFormFields>({
        resolver: zodResolver(createProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 500,
            category: '',
            type: '',
        },
    });

    const { mutateAsync, isPending } = useCreateProductMutation();
    const { handleError, handleSuccess } = useCreateProductHandler(form);

    const submit = async (values: CreateProductFormFields) => {
        try {
            const response = await mutateAsync(values);
            handleSuccess(response);
        } catch (error) {
            handleError(error as CreateProductErrorResponse);
        }
    };

    return { submit, form, isPending };
};
