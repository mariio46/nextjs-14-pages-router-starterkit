import { useDeleteUser } from '@/lib/api/data/users/delete-user';
import { UsersType } from '@/types/api/data/users';

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

interface UserDeleteDialogProps {
    user: UsersType;
    children: React.ReactNode;
}

const UserDeleteDialog = ({ user, children }: UserDeleteDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    const { handleDeleteUser, isPending, loading } = useDeleteUser();

    const deleteUseAction = () => handleDeleteUser(user.username);

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this user?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this user and remove data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm [&>div]:mt-2'>
                    <div>
                        <span className='text-muted-foreground'>Name</span>
                        <p className='font-medium text-foreground'>{user.name}</p>
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Username</span>
                        <p className='font-medium text-foreground'>{user.username}</p>
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Email</span>
                        <p className='font-medium text-foreground'>{user.email}</p>
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
                        onClick={deleteUseAction}
                        disabledWhen={isPending || loading}
                        defaultLabel='Delete'
                        onLoadingLabel='Deleting...'
                        variant='destructive'
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { UserDeleteDialog };
