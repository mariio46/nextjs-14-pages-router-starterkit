import { useToggleDialog } from '@/hooks/use-toggle-dialog';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { TypeCreateForm } from './type-create-form';

interface TypeCreateDialogProps {
    children: React.ReactNode;
}

export const TypeCreateDialog = ({ children }: TypeCreateDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Type</DialogTitle>
                    <DialogDescription>This action will create new type, fill the form and submit.</DialogDescription>
                </DialogHeader>

                <section id='create-type-form'>
                    <TypeCreateForm closeDialog={toggleDialog} />
                </section>
            </DialogContent>
        </Dialog>
    );
};
