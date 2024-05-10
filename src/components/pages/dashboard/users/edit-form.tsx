import { Link } from '@/components/link';
import { SubmitButton } from '@/components/submit-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEditUser } from '@/lib/api/data/users/edit-user';
import { SingleUserType } from '@/types/api/data/users';

export const EditUserForm = ({ user }: { user: SingleUserType }) => {
    const { form, isPending, submit } = useEditUser(user);

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
            )} />
                {/* prettier-ignore */}
                <FormField control={form.control} name='username' render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input aria-label='Username' autoComplete='username' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
                {/* prettier-ignore */}
                <FormField control={form.control} name='email' render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input aria-label='Email' autoComplete='email' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
                <div className='flex justify-start gap-4'>
                    <Link href={`/users/${user.username}`} variant='outline'>
                        Back
                    </Link>
                    <SubmitButton disabledWhen={isPending} defaultLabel='Save' onLoadingLabel='Saving...' />
                </div>
            </form>
        </Form>
    );
};
