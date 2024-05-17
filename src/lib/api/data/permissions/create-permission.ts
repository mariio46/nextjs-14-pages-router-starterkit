import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { PermissionIndexType } from '@/types/api/data/permissions';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createPermissionSchema = z.object({
    name: z
        .string({ required_error: 'The name field is required.' })
        .min(5, 'The name field must be at least 5 characters.')
        .toLowerCase(),
});

type CreatePermissionResponse = ApiResponse<{ permission: PermissionIndexType }>;

type CreatePermissionErrorResponse = AxiosError<ApiValidationErrorResponse<{ name?: string[] }>>;

type SubmittedPermissionType = { name: string };

type CreatePermissionFormField = z.infer<typeof createPermissionSchema>;

export const useCreatePermission = () => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<CreatePermissionFormField>({
        resolver: zodResolver(createPermissionSchema),
        defaultValues: {
            name: '',
        },
    });

    const { mutateAsync, isPending } = useMutation<
        CreatePermissionResponse,
        CreatePermissionErrorResponse,
        SubmittedPermissionType
    >({
        mutationKey: ['create-permission'],
        mutationFn: submitNewPermissionToServer,
        onSuccess: (data) => handleWhenCreatePermissionIsSuccess(data),
        onError: (error) => handleWhenCreatePermissionIsFailed(error),
    });

    const handleWhenCreatePermissionIsSuccess = async (data: CreatePermissionResponse) => {
        form.reset({
            name: '',
        });

        toast({
            title: 'Success',
            description: 'Permission has ben created successfully.',
        });

        router.push('/permissions');

        return await queryClient.invalidateQueries({
            queryKey: ['permissions'],
        });
    };

    const handleWhenCreatePermissionIsFailed = (error: CreatePermissionErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            errors?.name && form.setError('name', { message: errors.name[0] });
        } else {
            console.error({ error });
        }
    };

    const submit = async (values: CreatePermissionFormField) => {
        const submittedData: SubmittedPermissionType = {
            name: values.name,
        };

        // prettier-ignore
        return await mutateAsync(submittedData).then((res) => res).catch((e) => e);
    };

    return { asyncSubmit: submit, form, isPending };
};

// prettier-ignore
const submitNewPermissionToServer = async (values: SubmittedPermissionType) => {
    return await axios.post('/permissions/store', values, getClientSideAxiosHeaders()).then((res) => res.data)
}
