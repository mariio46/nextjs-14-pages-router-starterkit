import { RoleShowType } from '@/types/api/data/roles';

import { Icon } from '@/components/icon';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { RoleDeleteDialog } from '../role-delete-dialog';

interface RoleDetailActionProps {
    role: RoleShowType;
}

export const RoleDetailAction = ({ role }: RoleDetailActionProps) => {
    return (
        role && (
            <div className='flex items-center gap-2'>
                <Link href={`/roles/${role.id}/edit`}>
                    <Icon name='IconEdit' className='me-1' />
                    Edit
                </Link>
                <RoleDeleteDialog role={role}>
                    <Button variant='destructive' type='button'>
                        <Icon name='IconTrash' className='me-1' />
                        Delete
                    </Button>
                </RoleDeleteDialog>
            </div>
        )
    );
};
