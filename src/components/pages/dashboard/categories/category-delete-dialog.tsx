import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { useDeleteCategory } from '@/lib/api/data/categories/delete-category';

import type { BaseProductCategoryType } from '@/types/api/data/product-categories';

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

interface CategoryDeleteDialogProps {
    category: BaseProductCategoryType;
    children: React.ReactNode;
}

export const CategoryDeleteDialog = ({ children, category }: CategoryDeleteDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    const { submit, isPending } = useDeleteCategory(category, toggleDialog);

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this category?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this category and remove data from
                        our servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm'>
                    <div>
                        <span className='text-muted-foreground'>Category Name</span>
                        <p className='font-medium text-foreground'>{category.name}</p>
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
                        onClick={() => submit(category.id)}
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
