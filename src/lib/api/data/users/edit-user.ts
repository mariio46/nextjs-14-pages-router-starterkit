import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { SingleUserType } from '@/types/api/data/users';
import { ApiResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditUserResponse = ApiResponse<{ new_username: string }>;

interface EditUserErrorResponse {
    errors?: {
        name?: string[];
        email?: string[];
        username?: string[];
    };
}

// prettier-ignore
const editUserFormSchema = z.object({
    name: z.string().min(1, 'The name field is required.').min(3, 'The name field must be at least 3 characters.'),
    email: z.string().email('The email field must be a valid email address.'),
    username: z.string()
        .min(1, 'The username field is required.')
        .min(5, 'The username field must be at least 5 characters.')
        .max(25, 'The username field must not be greater than 25 characters.')
        .toLowerCase(),
});

type EditUserFormFields = z.infer<typeof editUserFormSchema>;

export const useEditUser = (user: SingleUserType) => {
    const queryClient = useQueryClient();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<EditUserFormFields>({
        resolver: zodResolver(editUserFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            username: user.username,
        },
    });

    const editUser = async (values: EditUserFormFields) => {
        // prettier-ignore
        return await axios.put<EditUserResponse>(`/users/${user.username}`, values, getClientSideAxiosHeaders()).then((res) => res.data);
    };

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['edit-user', user.username],
        mutationFn: editUser,
        onSuccess: (data) => {
            const current_username = user.username === data.data.new_username ? user.username : data.data.new_username;

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: [current_username],
                exact: true,
            });

            router.push(`/users/${data.data.new_username}`);

            toast({
                title: 'Success',
                description: data.message,
            });
        },
        onError: (e: AxiosError<EditUserErrorResponse>) => {
            const error = e.response?.data?.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name: error?.name && form.setError('name', { message: error?.name[0] }),
                error_email: error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_username: error?.username && form.setError('username', { message: error?.username[0] }),
            })
        },
    });

    const submit = (values: EditUserFormFields) =>
        mutateAsync(values)
            .then((res) => res)
            .catch((e) => e);

    return { form, submit, isPending };
};
