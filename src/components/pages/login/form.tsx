import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/use-loading';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { LoginFormResponse, LoginFormType, loginFormSchema } from '@/types/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
    const { loading, startLoading, stopLoading } = useLoading();
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: 'password',
        },
    });

    const submit = async (values: LoginFormType) => {
        startLoading();
        try {
            const { data }: AxiosResponse<LoginFormResponse> = await axios.post('/login', values);

            toast({
                title: 'Success',
                description: data.message,
            });

            form.reset();

            if (hasCookie(TOKEN_COOKIE_KEY)) {
                deleteCookie(TOKEN_COOKIE_KEY);
            }

            setCookie(TOKEN_COOKIE_KEY, data.data.token, {
                maxAge: 60 * 60 * 24,
                // secure: process.env.NODE_ENV === 'production',
                secure: true,
            });

            // router.push('/profile');
            router.reload();
        } catch (e: any) {
            const error = e.response?.data?.errors;
            error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true });
            error?.password && form.setError('password', { message: error?.password[0] });
        } finally {
            stopLoading();
        }
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
                    <Button type='submit' disabled={loading} aria-label='Login'>
                        {loading && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!loading ? 'Login' : 'Login...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
