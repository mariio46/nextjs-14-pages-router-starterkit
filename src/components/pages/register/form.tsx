import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/use-loading';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RegisterFormResponse = {
    code: number;
    data: string;
    message: string;
};

const formSchema = z
    .object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password doesn't match.",
        path: ['password_confirmation'],
    });

export const RegisterForm = () => {
    const router = useRouter();
    const { loading, startLoading, stopLoading } = useLoading();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        startLoading();
        try {
            const response = await axios.post('/register', values);
            const data: RegisterFormResponse = response.data;
            toast({
                title: 'Success',
                description: data.data,
            });
            router.push('/login');
            form.reset();
        } catch (e: any) {
            const error = e.response?.data?.errors;
            error?.name && form.setError('name', { message: error?.name[0] });
            error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true });
            error?.password && form.setError('password', { message: error?.password[0] });
        } finally {
            stopLoading();
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
                    <Button type='submit' disabled={loading} aria-label='Submit'>
                        {loading && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!loading ? 'Submit' : 'Submitting...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
