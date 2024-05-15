import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RoleIndexType } from '@/types/api/data/roles';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { multipleSelectOptionSchema } from '@/lib/schema/multiple-select-option-schema';

type CreateRoleResponse = ApiResponse<RoleIndexType>;
type CreateRoleErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[]; permissions: string[] }>>;
type SubmitRoleType = { name: string; permissions: string[] };
type CreateRoleFormFields = z.infer<typeof createRoleFormSchema>;

const createRoleFormSchema = z.object({
    // prettier-ignore
    name: z.string({ required_error: 'The name field is required.' }).min(3, 'The name field must be at least 3 characters.').toLowerCase(),
    permissions: z.array(multipleSelectOptionSchema, { required_error: 'Please select at least 1 permission.' }),
});

export const useCreateNewRole = () => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<CreateRoleFormFields>({
        resolver: zodResolver(createRoleFormSchema),
        defaultValues: {
            name: '',
            permissions: [],
        },
    });

    const mutation = useMutation<CreateRoleResponse, CreateRoleErrorResponse, SubmitRoleType>({
        mutationKey: ['create-role'],
        mutationFn: submitNewRoleToServer,
        onSuccess: () => handleWhenCreateRoleIsSuccess(),
        onError: (error) => handleWhenCreateRoleIsFailed(error),
    });

    const handleWhenCreateRoleIsSuccess = (): void => {
        form.resetField('name', { defaultValue: '' });
        form.resetField('permissions', { defaultValue: [] });

        queryClient.invalidateQueries({
            queryKey: [FETCH_ALL_ROLES_KEY],
        });

        toast({
            title: 'Success',
            description: 'Role has ben created successfully.',
        });

        router.push('/roles');
    };

    const handleWhenCreateRoleIsFailed = (error: CreateRoleErrorResponse): void => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            errors?.name && form.setError('name', { message: errors.name[0] });
            errors?.permissions && form.setError('permissions', { message: errors.permissions[0] });
        } else {
            console.log({ error });
        }
    };

    const submit = async (values: CreateRoleFormFields) => {
        const submittedData: SubmitRoleType = {
            name: values.name,
            permissions: values.permissions.map((permission) => permission.value),
        };

        // prettier-ignore
        return await mutation.mutateAsync(submittedData).then((res) => res).catch((e) => e);
    };

    return { asyncSubmit: submit, form };
};

// prettier-ignore
const submitNewRoleToServer = async (values: SubmitRoleType) => {
    return await axios.post<CreateRoleResponse>('/roles/store', values, getClientSideAxiosHeaders()).then((res) => res.data);
};
