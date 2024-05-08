import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { ApiResponse } from '@/types/api-response';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BE_LOGIN } from '../../end-point';
import { TOKEN_COOKIE_KEY, TOKEN_DELETED_KEY } from '../../key';

interface LoginFormResponse extends ApiResponse {
    data: {
        user: User;
        access_token: {
            token: string;
            expires_at: string;
        };
    };
}

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export const useLogin = () => {
    const { toast } = useToast();

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const setAuthUser = useAuthUserState((state) => state.setUser);
    const isValidating = useAuthUserState((state) => state.isValidating);

    const router = useRouter();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { email: '', password: '' },
    });

    const submit = async (values: LoginFormType) => {
        try {
            const { data }: AxiosResponse<LoginFormResponse> = await axios.post(BE_LOGIN, values);
            handleWhenLoginSuccess(data);
        } catch (e: any) {
            const error: { email?: string[]; password?: string[] } = e.response?.data?.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_email: error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        }
    };

    const handleWhenLoginSuccess = (data: LoginFormResponse) => {
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
        isValidating(false);

        // reload for trigger the middleware
        router.push(!router.query.callback ? '/dashboard' : `${router.query.callback?.toString()}`);
    };

    return { submit, form };
};
