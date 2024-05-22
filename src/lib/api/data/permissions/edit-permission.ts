import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PermissionShowType } from '@/types/api/data/permissions';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';

const editPermissionFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .toLowerCase(),
});

type EditPermissionResponse = ApiResponse<{ permission: PermissionShowType }>;

type EditPermissionErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

type SubmittedPermissionType = { id: number; name: string };

type EditPermissionFormFields = z.infer<typeof editPermissionFormSchema>;

export const useEditPermission = (initialData: PermissionShowType) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<EditPermissionFormFields>({
        resolver: zodResolver(editPermissionFormSchema),
        defaultValues: {
            name: initialData.name,
        },
    });

    const { mutateAsync, isPending } = useMutation<
        EditPermissionResponse,
        EditPermissionErrorResponse,
        SubmittedPermissionType
    >({
        mutationKey: ['edit-permission', { id: initialData.id.toString() }],
        mutationFn: submitUpdatedPermissionToServer,
        onSuccess: (data) => handleWhenUpdatePermissionIsSuccess(data),
        onError: (error) => handleWhenUpdatePermissionIsFailed(error),
    });

    const handleWhenUpdatePermissionIsSuccess = (data: EditPermissionResponse) => {
        form.reset({
            name: data.data.permission.name,
        });

        router.push(`/permissions/${data.data.permission.id}`);

        toast({
            title: 'Success',
            description: 'Permission has been updated successfully.',
        });

        queryClient.invalidateQueries({
            queryKey: ['permissions', { id: data.data.permission.id.toString() }],
            exact: true,
        });

        return queryClient.invalidateQueries({
            queryKey: ['permissions'],
        });
    };

    const handleWhenUpdatePermissionIsFailed = (error: EditPermissionErrorResponse): void => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            errors?.name && form.setError('name', { message: errors.name[0] });
        } else {
            console.error({ error });
        }
    };

    const submit = async (values: EditPermissionFormFields) => {
        const submittedData: SubmittedPermissionType = {
            id: initialData.id,
            name: values.name,
        };

        return await mutateAsync(submittedData)
            .then((res) => res)
            .catch((e) => e);
    };

    return { form, asyncSubmit: submit, isMutationPending: isPending };
};

const submitUpdatedPermissionToServer = async (data: SubmittedPermissionType) => {
    return await axios
        .put<EditPermissionResponse>(`/permissions/${data.id}/update`, data, getClientSideAxiosHeaders())
        .then((res) => res.data);
};
