import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteRole } from '@/lib/api/data/roles/delete-role';
import { RoleIndexType, RoleShowType } from '@/types/api/data/roles';

interface DialogDeleteRoleProps {
    role: RoleIndexType | RoleShowType;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: () => void;
}

const DialogDeleteRole: React.FC<DialogDeleteRoleProps> = ({ role, children, open, onOpenChange }) => {
    const { handleDeleteRole, isPending } = useDeleteRole(onOpenChange, role);
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this role?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this role and remove data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm [&>div]:mt-2'>
                    <div>
                        <span className='text-muted-foreground'>Name</span>
                        <p className='font-medium text-foreground'>{role.name}</p>
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Guard Name</span>
                        <p className='font-medium text-foreground'>{role.guard}</p>
                    </div>
                </section>

                <DialogFooter className='mt-5 gap-2 sm:gap-0'>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton
                        type='button'
                        onClick={() => handleDeleteRole(role.id)}
                        disabledWhen={isPending}
                        defaultLabel='Delete'
                        onLoadingLabel='Deleting...'
                        variant='destructive'
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { DialogDeleteRole };
