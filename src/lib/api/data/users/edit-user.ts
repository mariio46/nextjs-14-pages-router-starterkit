import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import type { UserShowType } from '@/types/api/data/users';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';

type EditUserResponse = ApiResponse<{ user: UserShowType }>;

type EditUserErrorResponse = AxiosError<
    ApiValidationErrorResponse<{ name?: string[]; email?: string[]; username?: string[] }>
>;

const editUserFormSchema = z.object({
    name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.'),
    email: z.string().email('The email field must be a valid email address.'),
    username: z
        .string()
        .min(1, 'The username field is required.')
        .min(5, 'The username field must be at least 5 characters.')
        .max(25, 'The username field must not be greater than 25 characters.')
        .toLowerCase(),
});

type EditUserFormFields = z.infer<typeof editUserFormSchema>;

type SubmittedData = { username: string; user: EditUserFormFields };

const submitUpdatedUserToServer = async (data: SubmittedData) => {
    const url: string = `/users/${data.username}/update`;

    const payload = data.user;

    const response = await axios.put<EditUserResponse>(url, payload, getClientSideAxiosHeaders());

    return response.data.data.user;
};

const useEditUserMutation = (user: UserShowType) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<UserShowType, EditUserErrorResponse, SubmittedData>({
        mutationKey: ['edit-user', user.username],
        mutationFn: submitUpdatedUserToServer,
        onMutate: (variables) => {
            if (variables.username !== variables.user.username) {
                queryClient.removeQueries({
                    queryKey: [FETCH_ALL_USERS_KEY, { username: variables.username }],
                    exact: true,
                });
            }

            return variables;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY, { username: variables.user.username }],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useEditUserHandler = (form: UseFormReturn<EditUserFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: UserShowType) => {
        form.reset({
            name: response.name,
            email: response.email,
            username: response.username,
        });

        router.push(`/users/${response.username}`);

        toast({
            title: 'Success',
            description: 'User has been created successfully.',
        });

        return response;
    };

    const handleError = (error: EditUserErrorResponse) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors?.name) form.setError('name', { message: errors.name[0] });
            if (errors?.username) form.setError('username', { message: errors.username[0] });
            if (errors?.email) form.setError('email', { message: errors.email[0] }, { shouldFocus: true });
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

export const useEditUser = (user: UserShowType) => {
    const form = useForm<EditUserFormFields>({
        resolver: zodResolver(editUserFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            username: user.username,
        },
    });

    const { mutateAsync, isPending } = useEditUserMutation(user);
    const { handleError, handleSuccess } = useEditUserHandler(form);

    const submit = async (values: EditUserFormFields) => {
        const submittedData: SubmittedData = {
            username: user.username,
            user: values,
        };
        try {
            const response = await mutateAsync(submittedData);
            handleSuccess(response);
        } catch (error) {
            handleError(error as EditUserErrorResponse);
        }
    };

    return { form, submit, isPending };
};
