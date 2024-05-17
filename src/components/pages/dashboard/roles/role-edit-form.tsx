import { RoleShowType } from '@/types/api/data/roles';

import { useEditRole } from '@/lib/api/data/roles/edit-role';
import { MultipleSelectOption } from '@/lib/schema/multiple-select-option-schema';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import MultipleSelector from '@/components/ui/fancy-multiple-select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface RoleEditFormProps {
    role: RoleShowType;
    formData: MultipleSelectOption[];
}

export const RoleEditForm = ({ role, formData }: RoleEditFormProps) => {
    const { form, asyncSubmit, isMutationPending } = useEditRole(role);

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
                                <Input autoFocus placeholder='Role Name' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='permissions'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Permissions</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    {...field}
                                    defaultOptions={formData}
                                    placeholder='Select permissions'
                                    emptyIndicator={
                                        <p className='text-center text-base text-muted-foreground'>
                                            No permission found.
                                        </p>
                                    }
                                    hidePlaceholderWhenSelected
                                />
                            </FormControl>
                            <FormMessage className='!-mt-1' />
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    //  || form.formState.isSubmitSuccessful
                    disabled={form.formState.isSubmitting || isMutationPending}
                    aria-label='Save'>
                    {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                    {!form.formState.isSubmitting ? 'Save' : 'Saving...'}
                </Button>
            </form>
        </Form>
    );
};
