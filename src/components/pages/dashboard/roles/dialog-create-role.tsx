import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateRoleForm } from './create-role-form';

interface DialogCreateRoleProps {
    open: boolean;
    onOpenChange: () => void;
}

const DialogCreateRole: React.FC<DialogCreateRoleProps> = ({ open, onOpenChange }) => {
    return (
        <Dialog {...{ open, onOpenChange }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new Role</DialogTitle>
                    <DialogDescription>
                        This action allows you to define a new role. Enter the name of the role and submit the form.
                    </DialogDescription>
                </DialogHeader>

                <CreateRoleForm closeDialog={onOpenChange} />
            </DialogContent>
        </Dialog>
    );
};

export { DialogCreateRole };
