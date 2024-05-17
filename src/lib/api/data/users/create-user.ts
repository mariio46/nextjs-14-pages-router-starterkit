import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { UserIndexType } from '@/types/api/data/users';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';

type CreateUserFormResponse = ApiResponse<{ user: UserIndexType }>;
type CreateUserErrorResponse = AxiosError<
    ApiValidationErrorResponse<{ name?: string[]; email?: string[]; password?: string[] }>
>;

const createUserFormSchema = z
    .object({
        name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.'),
        email: z.string().email('The email field must be a valid email address.'),
        password: z.string().min(8, 'The password field must be at least 8 characters.'),
        password_confirmation: z.string().min(8, 'The confirm password field must be at least 8 characters.'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Password field confirmation does not match.',
        path: ['password_confirmation'],
    });

type CreateUserFormFields = z.infer<typeof createUserFormSchema>;

const createUser = async (values: CreateUserFormFields) => {
    const response = await axios.post<CreateUserFormResponse>('/users/store', values, getClientSideAxiosHeaders());
    return response.data.data.user;
};

const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<UserIndexType, CreateUserErrorResponse, CreateUserFormFields>({
        mutationKey: ['create-user'],
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useCreateUserHandler = (form: UseFormReturn<CreateUserFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: UserIndexType) => {
        form.reset();
        router.push('/users');
        toast({
            title: 'Success',
            description: 'User has been created successfully.',
        });
        return response;
    };

    const handleError = (error: CreateUserErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors?.name) form.setError('name', { message: errors.name[0] });
            if (errors?.email) form.setError('email', { message: errors.email[0] }, { shouldFocus: true });
            if (errors?.password) form.setError('password', { message: errors.password[0] });
        } else {
            toast({
                title: 'Failed',
                description: 'Something went wrong, please try again later.',
                variant: 'destructive',
                duration: 7000,
            });
        }
    };

    return { handleSuccess, handleError };
};

export const useCreateUser = () => {
    const form = useForm<CreateUserFormFields>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const { mutateAsync, isPending } = useCreateUserMutation();
    const { handleSuccess, handleError } = useCreateUserHandler(form);

    const submit = async (values: CreateUserFormFields) => {
        try {
            const result = await mutateAsync(values);
            handleSuccess(result);
        } catch (error) {
            handleError(error as CreateUserErrorResponse);
        }
    };

    return { submit, isPending, form };
};
