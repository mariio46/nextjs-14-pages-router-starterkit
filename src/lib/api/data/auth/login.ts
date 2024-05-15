import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { User } from '@/types/user';

import axios from '@/lib/axios';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { BE_LOGIN } from '../../end-point';
import { TOKEN_COOKIE_KEY, TOKEN_DELETED_KEY } from '../../key';

import { useToast } from '@/components/ui/use-toast';

interface DataLoginFormResponse {
    user: User;
    access_token: {
        token: string;
        expires_at: string;
    };
}

type LoginFormResponse = ApiResponse<DataLoginFormResponse>;

type LoginErrorResponse = ApiValidationErrorResponse<{ email?: string[]; password?: string[] }>;

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export const useLogin = () => {
    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const setAuthUser = useAuthUserState((state) => state.setUser);

    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { toast } = useToast();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { email: '', password: '' },
    });

    const submit = async (values: LoginFormType) => {
        await axios
            .post<LoginFormResponse>(BE_LOGIN, values)
            .then((response) => handleWhenLoginSuccess(response.data))
            .catch((e: AxiosError<LoginErrorResponse>) => handleWhenLoginFailed(e));
    };

    const handleWhenLoginSuccess = (data: LoginFormResponse): void => {
        toast({
            title: 'Success',
            description: data.message,
            duration: 2000,
        });

        // Reset Form
        form.reset();

        // will execute if has cookie, it will destroy due to avoid duplicate cookie with same key
        if (hasCookie(TOKEN_COOKIE_KEY)) {
            deleteCookie(TOKEN_COOKIE_KEY);
        }

        if (hasCookie(TOKEN_DELETED_KEY)) {
            deleteCookie(TOKEN_DELETED_KEY);
        }

        // set cookie
        setCookie(TOKEN_COOKIE_KEY, data.data.access_token.token, {
            maxAge: 24 * 60 * 60,
            // expires: new Date(data.data.access_token.expires_at),
            secure: process.env.NODE_ENV === 'production',
        });

        // update auth user state
        setAuthUser(data.data.user);

        // trigger useEffect in _app.tsx to update auth user state once again
        setAuthCheck(true);

        mutate('/user', data.data.user);

        // reload for trigger the middleware
        router.push(!router.query.callback ? '/dashboard' : `${router.query.callback?.toString()}`);
    };

    const handleWhenLoginFailed = (e: AxiosError<LoginErrorResponse>): void => {
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

    return { submit, form };
};
