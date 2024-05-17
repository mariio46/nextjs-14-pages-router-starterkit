import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { BE_UPDATE_PASSWORD } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

type UpdatePasswordResponse = ApiResponse<null>;

type UpdatePasswordErrorResponse = AxiosError<
    ApiValidationErrorResponse<{ current_password?: string[]; password?: string[] }>
>;

const updatePasswordFormSchema = z
    .object({
        current_password: z
            .string({
                required_error: 'Current Password is required.',
                invalid_type_error: 'Current Password must be a string.',
            })
            .min(1, { message: 'Current Password is required.' }),
        password: z
            .string({
                required_error: 'New Password is required.',
                invalid_type_error: 'New Password must be a string.',
            })
            .min(8, { message: 'New Password field must be at least 8 characters.' }),
        password_confirmation: z
            .string({
                required_error: 'Password Confirmation is required.',
                invalid_type_error: 'Password Confirmation must be a string.',
            })
            .min(8, { message: 'Password Confirmation field must be at least 8 characters.' }),
    })
    .refine((fields) => fields.password === fields.password_confirmation, {
        message: 'Password field confirmation does not match.',
        path: ['password'],
    })
    .refine((fields) => fields.password !== fields.current_password, {
        message: 'Current password cannot be same with new password',
        path: ['password'],
    });
type UpdatePasswordFormFields = z.infer<typeof updatePasswordFormSchema>;

const useUpdatePasswordHandler = (form: UseFormReturn<UpdatePasswordFormFields>) => {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const { toast } = useToast();

    const handleSuccess = (data: UpdatePasswordResponse) => {
        form.reset();

        deleteCookie(TOKEN_COOKIE_KEY);

        setAuthCheck(false);

        mutate('/user', undefined);

        toast({
            title: 'Success',
            description: 'Your password is updated successfully, please login again.',
            duration: 10000,
        });

        router.replace('/login?callback=/settings');
    };

    const handleError = (e: UpdatePasswordErrorResponse) => {
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

    return { handleError, handleSuccess };
};

export const useUpdatePassword = () => {
    const form = useForm<UpdatePasswordFormFields>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    const { handleError, handleSuccess } = useUpdatePasswordHandler(form);

    const submit = async (values: UpdatePasswordFormFields) => {
        console.log({ values });
        try {
            // prettier-ignore
            const { data } = await axios.post<UpdatePasswordResponse>(BE_UPDATE_PASSWORD, values, getClientSideAxiosHeaders())
            console.log({ data });
            handleSuccess(data);
        } catch (error) {
            console.log({ error });
            handleError(error as UpdatePasswordErrorResponse);
        }
    };

    // prettier-ignore
    const disabled: boolean = !form.formState.isDirty || form.formState.isSubmitting || form.formState.isSubmitSuccessful;

    return { form, submit, disabled };
};
