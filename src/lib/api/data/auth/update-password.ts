import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { ApiResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { BE_UPDATE_PASSWORD } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

type UpdatePasswordResponse = ApiResponse<null>;

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

    const submit = async (values: UpdatePasswordFormFields): Promise<void> => {
        try {
            // prettier-ignore
            const response = await axios.post<UpdatePasswordResponse>(BE_UPDATE_PASSWORD, values, getClientSideAxiosHeaders())

            handleWhenUpdatingPasswordIsSuccess(response.data);
        } catch (e: any) {
            const error: { current_password?: string[]; password?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e,toast, {
                error_current_password: error?.current_password && form.setError('current_password', { message: error?.current_password[0] }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        }
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

    return { submit, form, disabled };
};
