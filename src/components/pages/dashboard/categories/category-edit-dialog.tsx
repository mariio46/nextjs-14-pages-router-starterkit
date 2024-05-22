import { useToggleDialog } from '@/hooks/use-toggle-dialog';

import type { BaseProductCategoryType } from '@/types/api/data/product-categories';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CategoryEditForm } from './category-edit-form';

interface CategoryEditDialogProps {
    category: BaseProductCategoryType;
    children: React.ReactNode;
}

export const CategoryEditDialog = ({ category, children }: CategoryEditDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        This action will update the category you choose, fill the form and submit.
                    </DialogDescription>
                </DialogHeader>

                <section id='edit-category-form'>
                    <CategoryEditForm category={category} closeDialog={toggleDialog} />
                </section>
            </DialogContent>
        </Dialog>
    );
};
