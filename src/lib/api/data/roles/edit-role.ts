import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RoleShowType } from '@/types/api/data/roles';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { MultipleSelectOption, multipleSelectOptionSchema } from '@/lib/schema/multiple-select-option-schema';
import { capitalize } from '@/lib/utils';

type EditRoleResponse = ApiResponse<{ role: RoleShowType }>;
type EditRoleErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[]; permissions: string[] }>>;
type SubmitRoleType = { id?: number; name: string; permissions: string[] };

const editRoleFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(3, 'The name field must be at least 3 characters.')
        .toLowerCase(),
    permissions: z.array(multipleSelectOptionSchema, { required_error: 'Please select at least 1 permission.' }),
});

type EditRoleFormFields = z.infer<typeof editRoleFormSchema>;

const submitUpdatedRoleToServer = async (opts: SubmitRoleType) => {
    const { data } = await axios.put<EditRoleResponse>(`/roles/${opts.id}/update`, opts, getClientSideAxiosHeaders());

    return data;
};

const useRoleMutationHandler = (role: RoleShowType | undefined) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<EditRoleResponse, EditRoleErrorResponse, SubmitRoleType>({
        mutationKey: ['create-role'],
        mutationFn: submitUpdatedRoleToServer,
        onMutate: (variables) => {
            if (variables.id !== role?.id) {
                queryClient.removeQueries({
                    queryKey: [FETCH_ALL_ROLES_KEY, { id: variables.id }],
                    exact: true,
                });
            }

            return variables;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY, { id: variables.id?.toString() }],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useEditRoleHandler = (form: UseFormReturn<EditRoleFormFields>) => {
    const { toast } = useToast();
    const router = useRouter();

    const handleSuccess = (data: EditRoleResponse) => {
        form.reset({
            name: data.data.role.name,
            permissions: transformToFormData(data.data.role),
        });

        router.push(`/roles/${data.data.role.id}`);

        toast({
            title: 'Success',
            description: 'Role has been updated successfully.',
        });

        return data;
    };

    const handleError = (error: EditRoleErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            errors?.name && form.setError('name', { message: errors.name[0] });
            errors?.permissions && form.setError('permissions', { message: errors.permissions[0] });
        } else {
            console.error({ error });
        }
    };

    return { handleError, handleSuccess };
};

export const useEditRole = (initialData: RoleShowType | undefined) => {
    const form = useForm<EditRoleFormFields>({
        resolver: zodResolver(editRoleFormSchema),
        defaultValues: {
            name: initialData?.name,
            permissions: transformToFormData(initialData),
        },
    });

    const { mutateAsync, isPending } = useRoleMutationHandler(initialData);
    const { handleError, handleSuccess } = useEditRoleHandler(form);

    const submit = async (values: EditRoleFormFields) => {
        const submittedData: SubmitRoleType = {
            id: initialData?.id,
            name: values.name,
            permissions: values.permissions.map((p) => p.value),
        };

        try {
            const response = await mutateAsync(submittedData);
            handleSuccess(response);
        } catch (error) {
            handleError(error as EditRoleErrorResponse);
        }
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
