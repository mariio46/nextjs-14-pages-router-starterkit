import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdatePassword } from '@/lib/api/data/auth/update-password';

export const UpdatePasswordForm = () => {
    const { submit, form, disabled } = useUpdatePassword();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='current_password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='current-password'
                                    aria-label='Current Password'
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
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='new-password'
                                    aria-label='New Password'
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
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='confirm-new-password'
                                    aria-label='Confirm New Password'
                                    disabled={form.formState.isSubmitSuccessful}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type='submit' disabled={disabled} aria-label='Update'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Update' : 'Updating...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
