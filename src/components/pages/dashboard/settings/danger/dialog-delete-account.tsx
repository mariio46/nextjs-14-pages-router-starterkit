import { useToggleDialog } from '@/hooks/use-toggle-dialog';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormDeleteAccount } from './form-delete-account';

export const DialogDeleteAccount = () => {
    const { openDialog, toggleDialog } = useToggleDialog();
    return (
        <>
            <Button variant='destructive' onClick={toggleDialog}>
                Delete Account
            </Button>
            <Dialog open={openDialog} onOpenChange={toggleDialog}>
                <DialogContent className='max-w-xl'>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                            Please enter your password to confirm you would like to permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>
                    <FormDeleteAccount closeDialog={toggleDialog} />
                </DialogContent>
            </Dialog>
        </>
    );
};
