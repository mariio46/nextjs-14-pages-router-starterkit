import { useCreatePermission } from '@/lib/api/data/permissions/create-permission';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const PermissionCreateForm = () => {
    const { asyncSubmit, form } = useCreatePermission();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(asyncSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoFocus placeholder='Permission Name' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                    aria-label='Save'>
                    {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                    {!form.formState.isSubmitting ? 'Save' : 'Saving...'}
                </Button>
            </form>
        </Form>
    );
};
