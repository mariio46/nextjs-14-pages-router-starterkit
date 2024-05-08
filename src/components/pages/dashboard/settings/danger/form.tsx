import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDeleteAccount } from '@/lib/api/data/auth/delete-account';

export const DeleteAccountForm = ({ closeDialog }: { closeDialog: () => void }) => {
    const { submit, form, disabled } = useDeleteAccount(closeDialog);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
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
                    <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                        <Button variant='outline' type='button' onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='destructive' disabled={disabled} aria-label='Update'>
                            {form.formState.isSubmitting && (
                                <Icon name='IconLoader' className='size-4 me-1 animate-spin' />
                            )}
                            {!form.formState.isSubmitting ? 'Delete Account' : 'Deleting...'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
