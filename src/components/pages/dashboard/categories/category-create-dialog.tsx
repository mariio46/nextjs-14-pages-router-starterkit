import { useToggleDialog } from '@/hooks/use-toggle-dialog';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CategoryCreateForm } from './category-create-form';

interface CategoryCreateDialogProps {
    children: React.ReactNode;
}

export const CategoryCreateDialog = ({ children }: CategoryCreateDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        This action will create new category, fill the form and submit.
                    </DialogDescription>
                </DialogHeader>

                <section id='create-category-form'>
                    <CategoryCreateForm closeDialog={toggleDialog} />
                </section>
            </DialogContent>
        </Dialog>
    );
};
