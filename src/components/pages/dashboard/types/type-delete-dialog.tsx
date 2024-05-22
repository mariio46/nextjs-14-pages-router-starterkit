import { useToggleDialog } from '@/hooks/use-toggle-dialog';

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
import { useDeleteType } from '@/lib/api/data/types/delete-type';
import { BaseProductTypeType } from '@/types/api/data/product-types';

interface TypeDeleteDialogProps {
    type: BaseProductTypeType;
    children: React.ReactNode;
}

export const TypeDeleteDialog = ({ children, type }: TypeDeleteDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    const { submit, isPending } = useDeleteType(type, toggleDialog);

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this type?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this type and remove data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm'>
                    <div>
                        <span className='text-muted-foreground'>Type Name</span>
                        <p className='font-medium text-foreground'>{type.name}</p>
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
                        onClick={() => submit(type.id)}
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
