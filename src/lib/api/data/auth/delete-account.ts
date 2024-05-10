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
import { BE_DELETE_ACCOUNT } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

const deleteAccountFormSchema = z.object({
    password: z.string().min(1, { message: 'Password is required.' }),
});

type DeleteAccountFormFields = z.infer<typeof deleteAccountFormSchema>;

export const useDeleteAccount = (closeDialog: () => void) => {
    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const { mutate } = useSWRConfig();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<DeleteAccountFormFields>({
        resolver: zodResolver(deleteAccountFormSchema),
        defaultValues: {
            password: '',
        },
    });

    // prettier-ignore
    const disabled: boolean = !form.formState.isDirty ||form.formState.isSubmitting || form.formState.isSubmitSuccessful;

    const submit = async (values: DeleteAccountFormFields) => {
        try {
            // prettier-ignore
            const response = await axios.post<ApiResponse<null>>(BE_DELETE_ACCOUNT, values, getClientSideAxiosHeaders())

            handleWhenDeletingAccountIsSuccess(response.data);
        } catch (e: any) {
            const error: { password?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e,toast, {
                error_password: error?.password && form.setError('password', { message: error?.password[0] }, { shouldFocus: true }),
            });
        }
    };

    const handleWhenDeletingAccountIsSuccess = (data: ApiResponse<null>): void => {
        closeDialog();

        toast({
            title: 'Success',
            description: data.message,
        });

        deleteCookie(TOKEN_COOKIE_KEY);

        setAuthCheck(false);

        mutate('/user', undefined);

        router.push('/');
    };

    return { submit, form, disabled };
};
