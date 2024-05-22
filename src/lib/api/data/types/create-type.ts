import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { TypeIndexType } from '@/types/api/data/product-types';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { AxiosError } from 'axios';

type CreateTypeResponse = ApiResponse<{ type: TypeIndexType }>;

type CreateTypeErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

const createTypeFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .max(255, 'The name field must not be greater than 255 characters.'),
});

type CreateTypeFormFields = z.infer<typeof createTypeFormSchema>;

const submitTypeToServer = async (values: CreateTypeFormFields) => {
    const { data } = await axios.post<CreateTypeResponse>('/types/store', values, getClientSideAxiosHeaders());
    return data;
};

const useCreateTypeMutation = (closeDialog: () => void) => {
    const queryClient = useQueryClient();

    // prettier-ignore
    const { mutateAsync, isPending } = useMutation<CreateTypeResponse, CreateTypeErrorResponse, CreateTypeFormFields>({
        mutationKey: ['create-type'],
        mutationFn: submitTypeToServer,
        onSuccess: () => {
            closeDialog();
            queryClient.invalidateQueries({
                queryKey: ['types'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useCreateTypeHandler = (form: UseFormReturn<CreateTypeFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: CreateTypeResponse) => {
        form.reset({
            name: '',
        });

        toast({
            title: 'Success',
            description: 'Type has ben created successfully.',
        });

        router.push('/types');

        return response;
    };

    const handleError = (error: CreateTypeErrorResponse) => {
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

export const useCreateType = (closeDialog: () => void) => {
    const form = useForm<CreateTypeFormFields>({
        resolver: zodResolver(createTypeFormSchema),
        defaultValues: {
            name: '',
        },
    });

    const { mutateAsync, isPending } = useCreateTypeMutation(closeDialog);
    const { handleError, handleSuccess } = useCreateTypeHandler(form);

    const submit = async (values: CreateTypeFormFields) => {
        try {
            const response = await mutateAsync(values);
            handleSuccess(response);
        } catch (error) {
            handleError(error as CreateTypeErrorResponse);
        }
    };

    return { form, submit, isPending };
};
