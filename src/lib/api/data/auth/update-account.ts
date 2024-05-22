import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import type { User } from '@/types/user';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { BE_UPDATE_ACCOUNT } from '../../end-point';

type UpdateAccountResponse = ApiResponse<{ user: User }>;

type UpdateAccountErrorResponse = AxiosError<
    ApiValidationErrorResponse<{
        name?: string[];
        username?: string[];
        email?: string[];
    }>
>;

const updateAccountFormSchema = z.object({
    name: z.string().min(3, {
        message: 'The name field must be at least 3 characters.',
    }),
    username: z
        .string()
        .min(5, { message: 'The username field must be at least 5 characters.' })
        .max(25, { message: 'The username field must not be greater than 25 characters.' })
        .toLowerCase(),
    email: z.string().email({ message: 'The email field must be a valid email address.' }).toLowerCase(),
});

type UpdateAccountFormFields = z.infer<typeof updateAccountFormSchema>;

const useUpdateAccountHandler = (form: UseFormReturn<UpdateAccountFormFields>) => {
    const { mutate } = useSWRConfig();

    const { toast } = useToast();

    const handleSuccess = (user: User) => {
        mutate('/user', user);

        form.reset({
            name: user.name,
            username: user.username,
            email: user.email,
        });

        toast({
            title: 'Success',
            description: 'Your account has been updated successfully.',
        });
    };

    const handleError = (e: UpdateAccountErrorResponse) => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error?.name && form.setError('name', { message: error?.name[0] });
            error?.username && form.setError('username', { message: error?.username[0] });
            error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true });
        } else {
            console.error(e);
            toast({
                title: 'Failed!',
                description: e.message,
                variant: 'destructive',
                duration: 10000,
            });
        }
    };

    return { handleError, handleSuccess };
};

export const useUpdateAccount = () => {
    const authUser = useAuthUserState((state) => state.user);

    const form = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountFormSchema),
        defaultValues: {
            name: authUser?.name,
            username: authUser?.username,
            email: authUser?.email,
        },
    });

    const { handleError, handleSuccess } = useUpdateAccountHandler(form);

    const submit = async (values: UpdateAccountFormFields) => {
        try {
            // prettier-ignore
            const { data } = await axios.post<UpdateAccountResponse>(BE_UPDATE_ACCOUNT, values, getClientSideAxiosHeaders());
            handleSuccess(data.data.user);
        } catch (error) {
            handleError(error as UpdateAccountErrorResponse);
        }
    };

    return { form, submit };
};
