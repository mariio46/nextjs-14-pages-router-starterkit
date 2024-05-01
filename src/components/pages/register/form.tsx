import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { ApiResponse } from '@/types/api-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
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
            const response = await axios.post('/register', values);
            const data: RegisterFormResponse = response.data;
            toast({
                title: 'Success',
                description: data.data,
                duration: 2000,
            });
            router.push('/login');
            form.reset();
        } catch (e: any) {
            if (isAxiosError(e)) {
                if (e.response?.status === 422) {
                    const error = e.response?.data.errors;
                    error?.name && form.setError('name', { message: error?.name[0] });
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
                    <Button type='submit' disabled={form.formState.isSubmitting} aria-label='Register'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Register' : 'Registering...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
