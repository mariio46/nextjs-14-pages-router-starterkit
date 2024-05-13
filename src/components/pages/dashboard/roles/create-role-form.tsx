import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateRole } from '@/lib/api/data/roles/create-role';

interface CreateRoleFormProps {
    closeDialog: () => void;
}

export const CreateRoleForm: React.FC<CreateRoleFormProps> = ({ closeDialog }) => {
    const { form, isPending, submit } = useCreateRole(closeDialog);

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
                                <Input autoFocus placeholder='Role Name' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline' type='button'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton disabledWhen={isPending} defaultLabel='Save' onLoadingLabel='Saving...' />
                </DialogFooter>
            </form>
        </Form>
    );
};
