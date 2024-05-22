import { useToggleDialog } from '@/hooks/use-toggle-dialog';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { BaseProductTypeType } from '@/types/api/data/product-types';
import { TypeEditForm } from './type-edit-form';

interface TypeEditDialogProps {
    type: BaseProductTypeType;
    children: React.ReactNode;
}

export const TypeEditDialog = ({ type, children }: TypeEditDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Type</DialogTitle>
                    <DialogDescription>
                        This action will update the type you choose, fill the form and submit.
                    </DialogDescription>
                </DialogHeader>

                <section id='edit-type-form'>
                    <TypeEditForm type={type} closeDialog={toggleDialog} />
                </section>
            </DialogContent>
        </Dialog>
    );
};
