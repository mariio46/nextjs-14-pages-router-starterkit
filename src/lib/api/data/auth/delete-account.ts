import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { BE_DELETE_ACCOUNT } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

type DeleteAccountResponse = ApiResponse<null>;

type DeleteAccountErrorResponse = AxiosError<ApiValidationErrorResponse<{ password?: string[] }>>;

const deleteAccountFormSchema = z.object({
    password: z.string().min(1, { message: 'Password is required.' }),
});

type DeleteAccountFormFields = z.infer<typeof deleteAccountFormSchema>;

const useDeleteAccountHandler = (form: UseFormReturn<DeleteAccountFormFields>, closeDialog: () => void) => {
    const router = useRouter();

    const { mutate } = useSWRConfig();

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const setAuthUser = useAuthUserState((state) => state.setUser);

    const { toast } = useToast();

    const handleSuccess = (data: DeleteAccountResponse) => {
        closeDialog();

        deleteCookie(TOKEN_COOKIE_KEY);

        setAuthCheck(false);
        setAuthUser(undefined);

        mutate('/user', undefined);

        toast({
            title: 'Success',
            description: 'Your account has deleted successfully. Goodbye👋',
            duration: 10000,
        });

        router.replace('/');
    };

    const handleError = (e: DeleteAccountErrorResponse) => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error?.password && form.setError('password', { message: error?.password[0] }, { shouldFocus: true });
        } else {
            closeDialog();
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

export const useDeleteAccount = (closeDialog: () => void) => {
    const form = useForm<DeleteAccountFormFields>({
        resolver: zodResolver(deleteAccountFormSchema),
        defaultValues: {
            password: '',
        },
    });

    const { handleError, handleSuccess } = useDeleteAccountHandler(form, closeDialog);

    const submit = async (values: DeleteAccountFormFields) => {
        try {
            // prettier-ignore
            const { data } = await axios.post<DeleteAccountResponse>(BE_DELETE_ACCOUNT, values, getClientSideAxiosHeaders())
            handleSuccess(data);
        } catch (error) {
            handleError(error as DeleteAccountErrorResponse);
        }
    };

    // prettier-ignore
    const disabled: boolean = !form.formState.isDirty || form.formState.isSubmitting || form.formState.isSubmitSuccessful;

    return { form, submit, disabled };
};
