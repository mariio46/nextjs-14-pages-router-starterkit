import { Icon } from '@/components/icon';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { PermissionShowType } from '@/types/api/data/permissions';
import { PermissionDeleteDialog } from '../permission-delete-dialog';

interface PermissionDetailActionProps {
    permission: PermissionShowType;
    status: 'pending' | 'error' | 'success';
}

export const PermissionDetailAction = ({ permission, status }: PermissionDetailActionProps) => {
    const { toggleDialog, openDialog } = useToggleDialog();

    return (
        <div className='flex items-center gap-2'>
            {status === 'success' && (
                <>
                    <Link href={`/permissions/${permission.id}/edit`}>
                        <Icon name='IconEdit' className='me-1' />
                        Edit
                    </Link>
                    <PermissionDeleteDialog permission={permission}>
                        <Button variant='destructive' type='button'>
                            <Icon name='IconTrash' className='me-1' />
                            Delete
                        </Button>
                    </PermissionDeleteDialog>
                </>
            )}
        </div>
    );
};
