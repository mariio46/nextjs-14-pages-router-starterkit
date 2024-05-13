import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { RoleIndexType, RoleShowType } from '@/types/api/data/roles';
import { EditRoleForm } from './edit-role-form';

interface DialogEditRoleProps {
    role: RoleIndexType | RoleShowType;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: () => void;
}

const DialogEditRole: React.FC<DialogEditRoleProps> = ({ role, children, open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update this role.</DialogTitle>
                    <DialogDescription>This action will be update the role you choose.</DialogDescription>
                </DialogHeader>

                <EditRoleForm {...{ onOpenChange, role }} />
            </DialogContent>
        </Dialog>
    );
};

export { DialogEditRole };
