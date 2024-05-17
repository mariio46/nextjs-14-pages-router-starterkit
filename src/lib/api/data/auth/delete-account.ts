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
import { BE_DELETE_ACCOUNT } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

import { useToast } from '@/components/ui/use-toast';

const deleteAccountFormSchema = z.object({
    password: z.string().min(1, { message: 'Password is required.' }),
});

type DeleteAccountFormFields = z.infer<typeof deleteAccountFormSchema>;

type DeleteAccountErrorResponse = ApiValidationErrorResponse<{ password?: string[] }>;

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

    // prettier-ignore
    const submit = async (values: DeleteAccountFormFields) => {
        await axios.post<ApiResponse<null>>(BE_DELETE_ACCOUNT, values, getClientSideAxiosHeaders())
            .then((response) => handleWhenDeletingAccountIsSuccess(response.data))
            .catch((e: AxiosError<DeleteAccountErrorResponse>) => handleWhenDeletingAccountIsFailed(e))
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

    const handleWhenDeletingAccountIsFailed = (e: AxiosError<DeleteAccountErrorResponse>): void => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error?.password && form.setError('password', { message: error?.password[0] }, { shouldFocus: true });
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
