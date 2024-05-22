import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import type { User } from '@/types/user';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { BE_LOGIN } from '../../end-point';
import { TOKEN_COOKIE_KEY, TOKEN_DELETED_KEY } from '../../key';

interface DataLoginFormResponse {
    user: User;
    access_token: {
        token: string;
        expires_at: string;
    };
}

type LoginFormResponse = ApiResponse<DataLoginFormResponse>;

type LoginErrorResponse = AxiosError<ApiValidationErrorResponse<{ email?: string[]; password?: string[] }>>;

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type LoginFormFields = z.infer<typeof loginFormSchema>;

const useLoginHandler = (form: UseFormReturn<LoginFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const { mutate } = useSWRConfig();

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const setAuthUser = useAuthUserState((state) => state.setUser);

    const handleSuccess = (data: LoginFormResponse) => {
        form.reset();

        if (hasCookie(TOKEN_COOKIE_KEY)) {
            deleteCookie(TOKEN_COOKIE_KEY);
        }

        setCookie(TOKEN_COOKIE_KEY, data.data.access_token.token, {
            maxAge: 24 * 60 * 60,
            // expires: new Date(data.data.access_token.expires_at),
            secure: true,
        });

        setAuthUser(data.data.user);

        setAuthCheck(true);

        mutate('/user', data.data.user);

        toast({
            title: 'Success',
            description: data.message,
        });

        router.push(!router.query.callback ? '/dashboard' : `${router.query.callback?.toString()}`);
    };

    const handleError = (e: LoginErrorResponse) => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error.email && form.setError('email', { message: error.email[0] }, { shouldFocus: true });
            error.password && form.setError('password', { message: error.password[0] });
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

export const useLogin = () => {
    const form = useForm<LoginFormFields>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleError, handleSuccess } = useLoginHandler(form);

    const submit = async (values: LoginFormFields) => {
        if (hasCookie(TOKEN_DELETED_KEY)) {
            deleteCookie(TOKEN_DELETED_KEY);
        }

        try {
            const { data } = await axios.post<LoginFormResponse>(BE_LOGIN, values);
            handleSuccess(data);
        } catch (error) {
            handleError(error as LoginErrorResponse);
        }
    };

    return { form, submit };
};
