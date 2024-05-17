import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { BE_UPDATE_PASSWORD } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

import { useToast } from '@/components/ui/use-toast';

type UpdatePasswordResponse = ApiResponse<null>;

type UpdatePasswordErrorResponse = ApiValidationErrorResponse<{ current_password?: string[]; password?: string[] }>;

// prettier-ignore
const updatePasswordFormSchema = z.object({
    current_password: z.string({
        required_error: 'Current Password is required.',
        invalid_type_error: 'Current Password must be a string.',
    }).min(1,{ message: 'Current Password is required.' }),
    password: z.string({
        required_error: 'New Password is required.',
        invalid_type_error: 'New Password must be a string.',
    }).min(8, { message: 'New Password field must be at least 8 characters.' }),
    password_confirmation: z.string({
        required_error: 'Password Confirmation is required.',
        invalid_type_error: 'Password Confirmation must be a string.',
    }).min(8, { message: 'Password Confirmation field must be at least 8 characters.' }),
}).refine((fields) => fields.password === fields.password_confirmation, {
    message: "Password field confirmation does not match.",
    path: ['password'],
})

type UpdatePasswordFormFields = z.infer<typeof updatePasswordFormSchema>;

export const useUpdatePassword = () => {
    const setAuthCheck = useAuthUserState((state) => state.setCheck);

    const { mutate } = useSWRConfig();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<UpdatePasswordFormFields>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    // prettier-ignore
    const disabled: boolean = !form.formState.isDirty || form.formState.isSubmitting || form.formState.isSubmitSuccessful;

    // prettier-ignore
    const submit = async (values: UpdatePasswordFormFields): Promise<void> => {
        await axios.post<UpdatePasswordResponse>(BE_UPDATE_PASSWORD, values, getClientSideAxiosHeaders())
            .then((response) => handleWhenUpdatingPasswordIsSuccess(response.data))
            .catch((e: AxiosError<UpdatePasswordErrorResponse>) => handleWhenUpdatingPasswordIsFailed(e));
    };

    const handleWhenUpdatingPasswordIsSuccess = (data: UpdatePasswordResponse): void => {
        form.reset();

        toast({
            title: 'Success',
            description: data.message,
        });

        deleteCookie(TOKEN_COOKIE_KEY);

        setAuthCheck(false);

        mutate('/user', undefined);

        router.replace('/login?callback=/settings');
    };

    const handleWhenUpdatingPasswordIsFailed = (e: AxiosError<UpdatePasswordErrorResponse>): void => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error?.current_password && form.setError('current_password', { message: error.current_password[0] });
            error?.password && form.setError('password', { message: error.password[0] });
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

    return { submit, form, disabled };
};
