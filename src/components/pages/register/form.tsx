import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { cn } from '@/lib/utils';
import type { ApiResponse } from '@/types/api-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RegisterFormResponse = ApiResponse & {
    data: string;
};

// prettier-ignore
const registerFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Password doesn't match.",
    path: ['password_confirmation'],
});

type RegisterFormFields = z.infer<typeof registerFormSchema>;

export const RegisterForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<RegisterFormFields>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (values: RegisterFormFields) => {
        try {
            const { data }: AxiosResponse<RegisterFormResponse> = await axios.post('/register', values);

            toast({
                title: 'Success',
                description: data.data,
                duration: 2000,
            });

            form.reset();

            setTimeout(() => router.push('/login'), 2100);
        } catch (e: any) {
            const error = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name: error?.name && form.setError('name', { message: error?.name[0] }),
                error_email: error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Your name'
                                    autoComplete='name'
                                    autoFocus
                                    type='text'
                                    aria-label='Name'
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
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@mail.com'
                                    autoComplete='email'
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
                <FormField
                    control={form.control}
                    name='password_confirmation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='confirm-password'
                                    disabled={form.formState.isSubmitSuccessful}
                                    aria-label='Confirm Password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end gap-4'>
                    <Link href='/login' className={cn(buttonVariants({ variant: 'ghost' }))}>
                        Already have an account
                    </Link>
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                        aria-label='Register'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Register' : 'Registering...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
