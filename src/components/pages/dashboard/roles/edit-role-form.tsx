import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateRole } from '@/lib/api/data/roles/edit-role';
import { RoleIndexType, RoleShowType } from '@/types/api/data/roles';

interface EditRoleFormProps {
    role: RoleIndexType | RoleShowType;
    onOpenChange: () => void;
}

export const EditRoleForm: React.FC<EditRoleFormProps> = ({ onOpenChange, role }) => {
    const { form, isPending, submit } = useUpdateRole(onOpenChange, role);

    const handleOnClose = () => {
        form.reset();
        form.setError('name', { message: undefined });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => submit({ values, id: role.id }))} className='space-y-4'>
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
                        <Button onClick={handleOnClose} variant='outline' type='button'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton disabledWhen={isPending} defaultLabel='Save' onLoadingLabel='Saving...' />
                </DialogFooter>
            </form>
        </Form>
    );
};
