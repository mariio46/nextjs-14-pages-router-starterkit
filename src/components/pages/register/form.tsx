import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/lib/api/data/auth/register';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const RegisterForm = () => {
    const { submit, form } = useRegister();

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
