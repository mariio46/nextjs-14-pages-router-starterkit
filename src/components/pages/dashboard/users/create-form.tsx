import { SubmitButton } from '@/components/submit-button';
import { buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
    CreateUserErrorResponse,
    CreateUserFormFields,
    createUser,
    createUserFormSchema,
} from '@/lib/api/data/users/create';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const CreateUserForm = () => {
    const queryClient = useQueryClient();

    const router = useRouter();
    const { toast } = useToast();

    // prettier-ignore
    const form = useForm<CreateUserFormFields>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    });

    const mutation = useMutation({
        mutationKey: ['create-user'],
        mutationFn: createUser,
        onSuccess: async (data) => {
            form.reset();
            router.push('/users');
            toast({
                title: 'Success',
                description: data.data,
            });
            queryClient.invalidateQueries({
                queryKey: ['users'],
                exact: true,
            });
        },
        onError: async (e: AxiosError<CreateUserErrorResponse>) => {
            const error = e.response?.data?.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name: error?.name && form.setError('name', { message: error?.name[0] }),
                error_email: error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        },
    });

    const submit = (values: CreateUserFormFields) => {
        // prettier-ignore
        mutation.mutateAsync(values).then(res => res).catch(e => e);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
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
                <div className='flex justify-start gap-4'>
                    <Link href='/users' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Back
                    </Link>
                    <SubmitButton disabledWhen={mutation.isPending} defaultLabel='Submit' onLoadingLabel='Submitting' />
                </div>
            </form>
        </Form>
    );
};
