import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { ApiResponse } from '@/types/api-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreateUserFormResponse extends ApiResponse {
    data: string;
}

interface CreateUserErrorResponse {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
}

const createUserFormSchema = z
    .object({
        name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.'),
        email: z.string().email('The email field must be a valid email address.'),
        password: z.string().min(8, 'The password field must be at least 8 characters.'),
        password_confirmation: z.string().min(8, 'The confirm password field must be at least 8 characters.'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Password field confirmation does not match.',
        path: ['password'],
    });

type CreateUserFormFields = z.infer<typeof createUserFormSchema>;

const createUser = async (values: CreateUserFormFields) => {
    // prettier-ignore
    return await axios.post<CreateUserFormResponse>('/users', values, getClientSideAxiosHeaders()).then((res) => res.data);
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const router = useRouter();
    const { toast } = useToast();

    // prettier-ignore
    const form = useForm<CreateUserFormFields>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    });

    const mutation = useMutation({
        mutationKey: ['create-user'],
        mutationFn: createUser,
        onSuccess: (data) => handleWhenCreateUserIsSuccess(data.data),
        onError: (e: AxiosError<CreateUserErrorResponse>) => {
            const error = e.response?.data?.errors;
            // // prettier-ignore
            handleAxiosError(e, toast, {
                error_name: error?.name && form.setError('name', { message: error?.name[0] }),
                error_email:
                    error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        },
    });

    // prettier-ignore
    const submit = (values: CreateUserFormFields) => mutation.mutateAsync(values).then(res => res).catch(e => e);

    const handleWhenCreateUserIsSuccess = (data: string): void => {
        form.reset();

        router.push('/users');

        toast({
            title: 'Success',
            description: data,
        });

        queryClient.invalidateQueries({
            queryKey: [FETCH_ALL_USERS_KEY],
            exact: true,
        });
    };

    return { submit, isPending: mutation.isPending, form };
};