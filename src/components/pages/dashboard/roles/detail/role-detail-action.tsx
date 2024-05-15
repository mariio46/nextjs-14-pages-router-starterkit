import { Icon } from '@/components/icon';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { RoleShowType } from '@/types/api/data/roles';
import { DialogDeleteRole } from '../dialog-delete-role';

interface RoleDetailActionProps {
    role: RoleShowType;
}

export const RoleDetailAction = ({ role }: RoleDetailActionProps) => {
    const { toggleDialog: setDeleteUserDialog, openDialog: deleteUserDialog } = useToggleDialog();

    return (
        role && (
            <div className='flex items-center gap-2'>
                <Link href={`/roles/${role.id}/edit`}>
                    <Icon name='IconEdit' className='me-1' />
                    Edit Role
                </Link>
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
