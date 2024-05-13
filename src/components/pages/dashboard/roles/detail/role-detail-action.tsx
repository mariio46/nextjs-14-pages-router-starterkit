import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { RoleShowType } from '@/types/api/data/roles';
import { DialogDeleteRole } from '../dialog-delete-role';
import { DialogEditRole } from '../dialog-edit-role';

interface RoleDetailActionProps {
    role: RoleShowType;
}

export const RoleDetailAction = ({ role }: RoleDetailActionProps) => {
    const { toggleDialog: setUpdateUserDialog, openDialog: updateUserDialog } = useToggleDialog();
    const { toggleDialog: setDeleteUserDialog, openDialog: deleteUserDialog } = useToggleDialog();

    return (
        role && (
            <div className='flex items-center gap-2'>
                <DialogEditRole open={updateUserDialog} onOpenChange={setUpdateUserDialog} role={role}>
                    <Button type='button'>
                        <Icon name='IconEdit' className='me-1' />
                        Edit Role
                    </Button>
                </DialogEditRole>
                <DialogDeleteRole open={deleteUserDialog} onOpenChange={setDeleteUserDialog} role={role}>
                    <Button variant='destructive' type='button'>
                        <Icon name='IconTrash' className='me-1' />
                        Delete Role
                    </Button>
                </DialogDeleteRole>
            </div>
        )
    );
};
