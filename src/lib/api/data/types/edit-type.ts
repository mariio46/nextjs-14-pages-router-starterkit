import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { BaseProductTypeType } from '@/types/api/data/product-types';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { TypeIndexType } from '@/types/api/data/product-types';

type EditTypeResponse = ApiResponse<{ type: TypeIndexType }>;

type EditTypeErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

const editTypeFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .max(255, 'The name field must not be greater than 255 characters.'),
});

type EditTypeFormFields = z.infer<typeof editTypeFormSchema>;

type SubmittedType = {
    id: number;
    type: EditTypeFormFields;
};

// prettier-ignore
const submitUpdatedTypeToServer = async (payload: SubmittedType) => {
    const { data } = await axios.put<EditTypeResponse>(`/types/${payload.id}/update`, payload.type, getClientSideAxiosHeaders());
    return data;
}

const useEditTypeMutation = (type: BaseProductTypeType, closeDiaog: () => void) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<EditTypeResponse, EditTypeErrorResponse, SubmittedType>({
        mutationKey: ['edit-type', { id: type.id.toString() }],
        mutationFn: submitUpdatedTypeToServer,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ['types', { id: variables.id.toString() }],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: ['types'],
                exact: true,
            });

            closeDiaog();
        },
    });

    return { mutateAsync, isPending };
};

const useEditTypeHandler = (form: UseFormReturn<EditTypeFormFields>) => {
    const { toast } = useToast();

    const handleSuccess = (response: EditTypeResponse) => {
        form.reset({
            name: response.data.type.name,
        });

        toast({
            title: 'Success',
            description: 'Type has ben updated successfully.',
        });

        return response;
    };
    const handleError = (error: EditTypeErrorResponse) => {
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

export const useEditType = (type: BaseProductTypeType, closeDialog: VoidFunction) => {
    const form = useForm<EditTypeFormFields>({
        resolver: zodResolver(editTypeFormSchema),
        defaultValues: {
            name: type.name,
        },
    });

    const { mutateAsync, isPending } = useEditTypeMutation(type, closeDialog);
    const { handleError, handleSuccess } = useEditTypeHandler(form);

    const submit = async (values: EditTypeFormFields) => {
        const payload: SubmittedType = {
            id: type.id,
            type: values,
        };

        try {
            const response = await mutateAsync(payload);
            handleSuccess(response);
        } catch (error) {
            handleError(error as EditTypeErrorResponse);
        }
    };

    return { form, submit, isPending };
};
