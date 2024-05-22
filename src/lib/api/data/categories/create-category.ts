import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { CategoryIndexType } from '@/types/api/data/product-categories';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import type { AxiosError } from 'axios';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';

type CreateCategoryResponse = ApiResponse<{ category: CategoryIndexType }>;

type CreateCategoryErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

const createCategoryFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .max(255, 'The name field must not be greater than 255 characters.'),
});

type CreateCategoryFormFields = z.infer<typeof createCategoryFormSchema>;

const submitCategoryToServer = async (values: CreateCategoryFormFields) => {
    const { data } = await axios.post<CreateCategoryResponse>('/categories/store', values, getClientSideAxiosHeaders());
    return data;
};

const useCreateCategoryMutation = (closeDialog: () => void) => {
    const queryClient = useQueryClient();

    // prettier-ignore
    const { mutateAsync, isPending } = useMutation<CreateCategoryResponse, CreateCategoryErrorResponse, CreateCategoryFormFields>({
        mutationKey: ['create-category'],
        mutationFn: submitCategoryToServer,
        onSuccess: () => {
            closeDialog();
            queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useCreateCategoryHandler = (form: UseFormReturn<CreateCategoryFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: CreateCategoryResponse) => {
        form.reset({
            name: '',
        });

        toast({
            title: 'Success',
            description: 'Category has ben created successfully.',
        });

        router.push('/categories');

        return response;
    };

    const handleError = (error: CreateCategoryErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors?.name) {
                form.setError('name', { message: errors.name[0] });
            }
        } else {
            console.error({ error });
        }
    };

    return { handleError, handleSuccess };
};

export const useCreateCategory = (closeDialog: () => void) => {
    const form = useForm<CreateCategoryFormFields>({
        resolver: zodResolver(createCategoryFormSchema),
        defaultValues: {
            name: '',
        },
    });

    const { mutateAsync, isPending } = useCreateCategoryMutation(closeDialog);
    const { handleError, handleSuccess } = useCreateCategoryHandler(form);

    const submit = async (values: CreateCategoryFormFields) => {
        try {
            const response = await mutateAsync(values);
            handleSuccess(response);
        } catch (error) {
            handleError(error as CreateCategoryErrorResponse);
        }
    };

    return { form, submit, isPending };
};
