import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { toastFailedMessage } from '@/lib/utils';
import { BaseProductType } from '@/types/api/data/products';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

type EditProductResponse = ApiResponse<{ product: BaseProductType }>;

type EditProductErrorResponse = AxiosError<
    ApiValidationErrorResponse<{ name?: string[]; description?: string[]; price?: string[] }>
>;

const editProductFormSchema = z.object({
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
});

type EditProductFormFields = z.infer<typeof editProductFormSchema>;

type SubmittedProductType = {
    id: number;
    product: EditProductFormFields;
};

const submitUpdatedProductToServer = async (payload: SubmittedProductType) => {
    const { data } = await axios.put(`/products/${payload.id}/update`, payload.product, getClientSideAxiosHeaders());
    return data;
};

const useEditProductMutation = (product: BaseProductType) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<EditProductResponse, EditProductErrorResponse, SubmittedProductType>(
        {
            mutationKey: ['edit-product', { id: product.id.toString() }],
            mutationFn: submitUpdatedProductToServer,
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries({
                    queryKey: ['products', { id: variables.id.toString() }],
                    exact: true,
                });

                queryClient.invalidateQueries({
                    queryKey: ['products'],
                    exact: true,
                });
            },
        },
    );

    return { mutateAsync, isPending };
};

const useEditProductHandler = (form: UseFormReturn<EditProductFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: EditProductResponse) => {
        form.reset({
            name: response.data.product.name,
            description: response.data.product.description,
            price: parseInt(response.data.product.price),
        });

        router.push(`/products/${response.data.product.id}`);

        toast({
            title: 'Success',
            description: 'Product has been created successfully.',
        });

        return response;
    };

    const handleError = (error: EditProductErrorResponse) => {
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
        } else {
            toast(
                toastFailedMessage(error, {
                    description: error.message,
                }),
            );
        }
    };

    return { handleError, handleSuccess };
};

export const useEditProduct = (product: BaseProductType) => {
    const form = useForm<EditProductFormFields>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            price: parseInt(product.price),
        },
    });

    const { mutateAsync, isPending } = useEditProductMutation(product);
    const { handleError, handleSuccess } = useEditProductHandler(form);

    const submit = async (values: EditProductFormFields) => {
        const payload: SubmittedProductType = {
            id: product.id,
            product: values,
        };

        try {
            const response = await mutateAsync(payload);
            handleSuccess(response);
        } catch (error) {
            handleError(error as EditProductErrorResponse);
        }
    };

    return { submit, form, isPending };
};
