import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { ApiResponse } from '@/types/api-response';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse, isAxiosError } from 'axios';
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
    const router = useRouter();
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { email: '', password: '' },
    });

    const submit = async (values: LoginFormType) => {
        try {
            const { data }: AxiosResponse<LoginFormResponse> = await axios.post('/login', values);

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

            // reload for trigger the middleware
            router.reload();
        } catch (e: any) {
            if (isAxiosError(e)) {
                if (e.response?.status === 422) {
                    const error = e.response?.data?.errors;
                    error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true });
                    error?.password && form.setError('password', { message: error?.password[0] });
                } else {
                    toast({
                        title: 'Failed',
                        description: e.response?.data?.message ?? 'Server is busy. Try again later!',
                        variant: 'destructive',
                    });
                }
            } else {
                console.error(e);
            }
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
                    <Button type='submit' disabled={form.formState.isSubmitting} aria-label='Login'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Login' : 'Login...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
