import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { RoleIndexType } from '@/types/api/data/roles';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { multipleSelectOptionSchema } from '@/lib/schema/multiple-select-option-schema';

type CreateRoleResponse = ApiResponse<{ role: RoleIndexType }>;
type CreateRoleErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[]; permissions: string[] }>>;
type SubmitRoleType = { name: string; permissions: string[] };

const createRoleFormSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(3, 'The name field must be at least 3 characters.')
        .toLowerCase(),
    permissions: z.array(multipleSelectOptionSchema, { required_error: 'Please select at least 1 permission.' }),
});

type CreateRoleFormFields = z.infer<typeof createRoleFormSchema>;

const submitNewRoleToServer = async (values: SubmitRoleType) => {
    const { data } = await axios.post<CreateRoleResponse>('/roles/store', values, getClientSideAxiosHeaders());

    return data;
};

const useRoleMutationHandler = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<CreateRoleResponse, CreateRoleErrorResponse, SubmitRoleType>({
        mutationKey: ['create-role'],
        mutationFn: submitNewRoleToServer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useCreateRoleHandler = (form: UseFormReturn<CreateRoleFormFields>) => {
    const { toast } = useToast();
    const router = useRouter();

    const handleSuccess = (data: CreateRoleResponse) => {
        form.reset({
            name: '',
            permissions: [],
        });

        toast({
            title: 'Success',
            description: 'Role has ben created successfully.',
        });

        router.push('/roles');
    };

    const handleError = (error: CreateRoleErrorResponse) => {
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

export const useCreateRole = () => {
    const form = useForm<CreateRoleFormFields>({
        resolver: zodResolver(createRoleFormSchema),
        defaultValues: {
            name: '',
            permissions: [],
        },
    });

    const { mutateAsync, isPending } = useRoleMutationHandler();
    const { handleError, handleSuccess } = useCreateRoleHandler(form);

    const submit = async (values: CreateRoleFormFields) => {
        const submittedData: SubmitRoleType = {
            name: values.name,
            permissions: values.permissions.map((permission) => permission.value),
        };

        try {
            const response = await mutateAsync(submittedData);
            handleSuccess(response);
        } catch (error) {
            handleError(error as CreateRoleErrorResponse);
        }
    };

    return { asyncSubmit: submit, form, isPending };
};
