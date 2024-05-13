import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { RoleIndexType } from '@/types/api/data/roles';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateRoleFormResponse = ApiResponse<RoleIndexType>;

type CreateUserErrorResponse = ApiValidationErrorResponse<{ name?: string[] }>;

// prettier-ignore
const createRoleFormSchema = z.object({
    name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.').toLowerCase(),
});

type CreateRoleFormFields = z.infer<typeof createRoleFormSchema>;

// prettier-ignore
const createRole = async (values: CreateRoleFormFields) => {
    return await axios.post<CreateRoleFormResponse>('/roles/store', values, getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useCreateRole = (closeDialog: () => void) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();

    const form = useForm<CreateRoleFormFields>({
        resolver: zodResolver(createRoleFormSchema),
        defaultValues: {
            name: '',
        },
    });

    // prettier-ignore
    const { mutateAsync, isPending } = useMutation<CreateRoleFormResponse, AxiosError<CreateUserErrorResponse>, CreateRoleFormFields>({
        mutationKey: ['create-role'],
        mutationFn: createRole,
        onSuccess: (data, variables, context) => {
            form.reset();

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY],
            });

            closeDialog();

            toast({
                title: 'Success',
                description: 'Role has ben created successfully.',
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
    const submit = async (values: CreateRoleFormFields) => {
        return await mutateAsync(values).then((res) => res).catch((e) => e);
    };

    return { submit, form, isPending };
};
