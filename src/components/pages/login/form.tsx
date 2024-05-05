import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { cn } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import type { ApiResponse } from '@/types/api-response';
import type { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosResponse } from 'axios';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export const LoginForm = () => {
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
            const { data }: AxiosResponse<LoginFormResponse> = await axios.post('/login', values);
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
        router.push('/dashboard');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@mail.com'
                                    autoComplete='email'
                                    autoFocus
                                    type='email'
                                    aria-label='Email'
                                    disabled={form.formState.isSubmitSuccessful}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='password'
                                    aria-label='Password'
                                    disabled={form.formState.isSubmitSuccessful}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end gap-4'>
                    <Link href='/register' className={cn(buttonVariants({ variant: 'ghost' }))}>
                        Register
                    </Link>
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                        aria-label='Login'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Login' : 'Login...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
