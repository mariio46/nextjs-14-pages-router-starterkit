import { type QueryStatus } from '@tanstack/react-query';

import type { UserIndexType, UserShowType } from '@/types/api/data/users';

import { Icon } from '@/components/icon';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { UserDeleteDialog } from '../user-delete-dialog';

interface UserDetailActionProps {
    user: UserShowType | UserIndexType;
    status: QueryStatus;
}

export const UserDetailAction = ({ user, status }: UserDetailActionProps) => {
    return (
        <div className='flex items-center gap-2'>
            {status === 'success' && (
                <>
                    <Link href={`/users/${user.username}/edit`}>
                        <Icon name='IconEdit' className='me-1' />
                        Edit
                    </Link>
                    <UserDeleteDialog user={user}>
                        <Button variant='destructive' type='button'>
                            <Icon name='IconTrash' className='me-1' />
                            Delete
                        </Button>
                    </UserDeleteDialog>
                </>
            )}
        </div>
    );
};
