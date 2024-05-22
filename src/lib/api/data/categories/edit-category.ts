import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { BaseProductCategoryType, CategoryIndexType } from '@/types/api/data/product-categories';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';

type EditCategoryResponse = ApiResponse<{ category: CategoryIndexType }>;

type EditCategoryErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

const editCategoryFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .max(255, 'The name field must not be greater than 255 characters.'),
});

type EditCategoryFormFields = z.infer<typeof editCategoryFormSchema>;

type SubmittedCategory = {
    id: number;
    category: EditCategoryFormFields;
};

// prettier-ignore
const submitUpdatedCategoryToServer = async (payload: SubmittedCategory) => {
    const { data } = await axios.put<EditCategoryResponse>(`/categories/${payload.id}/update`, payload.category, getClientSideAxiosHeaders());
    return data;
}

const useEditCategoryMutation = (category: BaseProductCategoryType, closeDiaog: () => void) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<EditCategoryResponse, EditCategoryErrorResponse, SubmittedCategory>({
        mutationKey: ['edit-category', { id: category.id.toString() }],
        mutationFn: submitUpdatedCategoryToServer,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ['categories', { id: variables.id.toString() }],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true,
            });

            closeDiaog();
        },
    });

    return { mutateAsync, isPending };
};

const useEditCategoryHandler = (form: UseFormReturn<EditCategoryFormFields>) => {
    const { toast } = useToast();

    const handleSuccess = (response: EditCategoryResponse) => {
        form.reset({
            name: response.data.category.name,
        });

        toast({
            title: 'Success',
            description: 'Category has ben updated successfully.',
        });

        return response;
    };
    const handleError = (error: EditCategoryErrorResponse) => {
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

export const useEditCategory = (category: BaseProductCategoryType, closeDialog: VoidFunction) => {
    const form = useForm<EditCategoryFormFields>({
        resolver: zodResolver(editCategoryFormSchema),
        defaultValues: {
            name: category.name,
        },
    });

    const { mutateAsync, isPending } = useEditCategoryMutation(category, closeDialog);
    const { handleError, handleSuccess } = useEditCategoryHandler(form);

    const submit = async (values: EditCategoryFormFields) => {
        const payload: SubmittedCategory = {
            id: category.id,
            category: values,
        };

        try {
            const response = await mutateAsync(payload);
            handleSuccess(response);
        } catch (error) {
            handleError(error as EditCategoryErrorResponse);
        }
    };

    return { form, submit, isPending };
};
