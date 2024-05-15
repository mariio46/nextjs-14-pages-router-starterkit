import { BasePermissionType } from '@/types/api/data/permissions';

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
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { useDeletePermission } from '@/lib/api/data/permissions/delete-permission';

interface DialogDeletePermissionProps {
    permission: BasePermissionType;
    children: React.ReactNode;
}

export const DialogDeletePermission = ({ children, permission }: DialogDeletePermissionProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    const { handleDelete, isPending } = useDeletePermission(permission, toggleDialog);

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this permission?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this permission and remove data from
                        our servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm [&>div]:mt-2'>
                    <div>
                        <span className='text-muted-foreground'>Name</span>
                        <p className='font-medium text-foreground'>{permission.name}</p>
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Guard Name</span>
                        <p className='font-medium text-foreground'>{permission.guard}</p>
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
                        onClick={() => handleDelete(permission.id)}
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
