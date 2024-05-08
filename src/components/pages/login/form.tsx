import { Icon } from '@/components/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/lib/api/data/auth/login';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const LoginForm = () => {
    const { submit, form } = useLogin();

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
