import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { RoleIndexType, RoleShowType } from '@/types/api/data/roles';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditRoleFormResponse = ApiResponse<RoleIndexType>;

type EditUserErrorResponse = ApiValidationErrorResponse<{ name?: string[] }>;

// prettier-ignore
const editRoleFormSchema = z.object({
    name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.').toLowerCase(),
});

type EditRoleFormFields = z.infer<typeof editRoleFormSchema>;

type UpdateRoleProps = {
    values: EditRoleFormFields;
    id: number;
};

// prettier-ignore
const updateRole = async (opts: UpdateRoleProps) => {
    return await axios.put<EditRoleFormResponse>(`/roles/${opts.id}/update`, opts.values, getClientSideAxiosHeaders()).then(res => res.data);
}

export const useUpdateRole = (closeDialog: () => void, initialData: RoleIndexType | RoleShowType) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();

    const form = useForm<EditRoleFormFields>({
        resolver: zodResolver(editRoleFormSchema),
        defaultValues: {
            name: initialData.name,
        },
    });

    // prettier-ignore
    const { mutateAsync, isPending } = useMutation<EditRoleFormResponse, AxiosError<EditUserErrorResponse>, UpdateRoleProps>({
        mutationKey: [`update-role-with-id-${initialData.id}`],
        mutationFn: updateRole,
        onSuccess: (data, variables, context) => {
            closeDialog();

            form.reset({ name: data.data.name });

            toast({
                title: 'Success',
                description: 'Role has been updated successfully.',
            });

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY, `role-with-id-${initialData.id}`],
            });

            return queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY],
            });
        },
        onError: (error, variables, context) => {
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                errors?.name && form.setError('name', { message: errors.name[0] });
            } else {
                console.log({ error, variables, context });
            }
        },
    });

    // prettier-ignore
    const submit = async (opts: UpdateRoleProps) => {
        return await mutateAsync({ values: opts.values, id: opts.id }).then((r) => r).catch((e) => e);
    };

    return { submit, isPending, form };
};
