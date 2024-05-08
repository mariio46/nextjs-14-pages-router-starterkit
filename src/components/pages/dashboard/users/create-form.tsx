import { SubmitButton } from '@/components/submit-button';
import { buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/lib/api/data/users/create-user';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const CreateUserForm = () => {
    const { submit, isPending, form } = useCreateUser();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                {/* prettier-ignore */}
                <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoFocus aria-label='Name' autoComplete='name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* prettier-ignore */}
                <FormField control={form.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input aria-label='Email' autoComplete='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* prettier-ignore */}
                <FormField control={form.control} name='password' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' aria-label='Password' autoComplete='new-password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* prettier-ignore */}
                <FormField control={form.control} name='password_confirmation' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' aria-label='Password Confirmation' autoComplete='new-password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-start gap-4'>
                    <Link href='/users' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Back
                    </Link>
                    <SubmitButton disabledWhen={isPending} defaultLabel='Save' onLoadingLabel='Saving...' />
                </div>
            </form>
        </Form>
    );
};
