import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RoleShowType } from '@/types/api/data/roles';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { MultipleSelectOption, multipleSelectOptionSchema } from '@/lib/schema/multiple-select-option-schema';
import { capitalize } from '@/lib/utils';

type EditRoleResponse = ApiResponse<RoleShowType>;
type EditRoleErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[]; permissions: string[] }>>;
type SubmitRoleType = { id?: number; name: string; permissions: string[] };
type EditRoleFormFields = z.infer<typeof editRoleFormSchema>;

const editRoleFormSchema = z.object({
    // prettier-ignore
    name: z.string({ required_error: 'The name field is required.' }).min(3, 'The name field must be at least 3 characters.').toLowerCase(),
    permissions: z.array(multipleSelectOptionSchema, { required_error: 'Please select at least 1 permission.' }),
});

export const useEditRole = (initialData: RoleShowType | undefined) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<EditRoleFormFields>({
        resolver: zodResolver(editRoleFormSchema),
        defaultValues: {
            name: initialData?.name,
            permissions: transformToFormData(initialData),
        },
    });

    const { mutateAsync, isPending } = useMutation<EditRoleResponse, EditRoleErrorResponse, SubmitRoleType>({
        mutationKey: [`update-role-with-id-${initialData?.id}`],
        mutationFn: submitUpdatedRoleToServer,
        onSuccess: (data) => handleWhenUpdateRoleIsSuccess(data),
        onError: (error) => handleWhenUpdateRoleIsFailed(error),
    });

    const handleWhenUpdateRoleIsSuccess = (data: EditRoleResponse) => {
        form.reset({
            name: data.data.name,
            permissions: transformToFormData(data.data),
        });

        router.push(`/roles/${data.data.id}`);

        toast({
            title: 'Success',
            description: 'Role has been updated successfully.',
        });

        queryClient.invalidateQueries({
            queryKey: [FETCH_ALL_ROLES_KEY, `role-with-id-${initialData?.id}`],
        });

        return queryClient.invalidateQueries({
            queryKey: [FETCH_ALL_ROLES_KEY],
        });
    };

    const handleWhenUpdateRoleIsFailed = (error: EditRoleErrorResponse): void => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            errors?.name && form.setError('name', { message: errors.name[0] });
            errors?.permissions && form.setError('permissions', { message: errors.permissions[0] });
        } else {
            console.log({ error });
        }
    };

    const submit = async (values: EditRoleFormFields) => {
        const submittedData = {
            id: initialData?.id,
            name: values.name,
            permissions: values.permissions.map((p) => p.value),
        } satisfies SubmitRoleType;

        // prettier-ignore
        return await mutateAsync(submittedData).then(res => res).catch(e => e);
    };

    return { form, asyncSubmit: submit, isMutationPending: isPending };
};

const transformToFormData = (data: RoleShowType | undefined) => {
    const formData: MultipleSelectOption[] | undefined =
        data &&
        data.permissions &&
        data.permissions.map((permission) => {
            return {
                label: capitalize(permission.name),
                value: permission.name,
            };
        });

    return formData;
};

// prettier-ignore
const submitUpdatedRoleToServer = async (opts: SubmitRoleType) => {
    return await axios.put<EditRoleResponse>(`/roles/${opts.id}/update`, opts, getClientSideAxiosHeaders()).then(res => res.data);
}
