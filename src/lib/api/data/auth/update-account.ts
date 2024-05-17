import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { User } from '@/types/user';

import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { BE_UPDATE_ACCOUNT } from '../../end-point';

import { useToast } from '@/components/ui/use-toast';

type UpdateAccountResponse = ApiResponse<User>;

type UpdateAccountErrorResponse = ApiValidationErrorResponse<{
    name?: string[];
    username?: string[];
    email?: string[];
}>;

// prettier-ignore
const updateAccountFormSchema = z.object({
    name: z.string().min(3, { 
            message: 'The name field must be at least 3 characters.' 
        }),
    username: z.string().min(5, {
            message: 'The username field must be at least 5 characters.',
        }).max(25, {
            message: 'The username field must not be greater than 25 characters.',
        }).toLowerCase(),
    email: z.string().email({ 
            message: 'The email field must be a valid email address.' 
        }).toLowerCase(),
});

type UpdateAccountFormFields = z.infer<typeof updateAccountFormSchema>;

export const useUpdateAccount = () => {
    const authUser = useAuthUserState((state) => {
        return {
            name: state.user?.name,
            username: state.user?.username,
            email: state.user?.email,
        };
    });

    const { mutate } = useSWRConfig();

    const { toast } = useToast();

    const form = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountFormSchema),
        defaultValues: {
            name: authUser?.name,
            username: authUser?.username,
            email: authUser?.email,
        },
    });

    // prettier-ignore
    const submit = async (values: UpdateAccountFormFields): Promise<void> => {
        await axios.post<UpdateAccountResponse>(BE_UPDATE_ACCOUNT, values, getClientSideAxiosHeaders())
            .then((response) => handleWhenUpdatingAccountIsSuccess(response.data))
            .catch((e: AxiosError<UpdateAccountErrorResponse>) => handleWhenUpdatingAccountIsFailed(e))
    };

    const handleWhenUpdatingAccountIsSuccess = (data: UpdateAccountResponse): void => {
        form.reset({
            name: data.data.name,
            username: data.data.username,
            email: data.data.email,
        });

        // Revalidate Auth User State
        mutate('/user', data.data);

        // Toast for showing that updating account is success
        toast({
            title: 'Success',
            description: data.message,
        });
    };

    const handleWhenUpdatingAccountIsFailed = (e: AxiosError<UpdateAccountErrorResponse>): void => {
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

    return { submit, form };
};
