import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { UsersType } from '@/types/api/data/users';
import Link from 'next/link';
import { DialogDeleteUser } from './dialog-delete-user';

interface ColumnUserDropdownActionProps {
    user: UsersType;
}

const ColumnUserDropdownAction: React.FC<ColumnUserDropdownActionProps> = ({ user }) => {
    const { copyUsernameToClipboard } = useCopyToClipboard();

    return (
        <div className='text-end'>
            <DropdownMenu key={user.id}>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='h-5' size='icon'>
                        <span className='sr-only'>Open menu</span>
                        <Icon name='IconDots' className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[12rem] z-[61]'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/users/${user.username}`}>
                            <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/users/${user.username}/edit`}>
                            <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => copyUsernameToClipboard(user.username)}>
                        <Icon name='IconClipboard' className='me-1.5 stroke-[1.3]' />
                        Copy username
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DialogDeleteUser user={user}>
                        <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                            <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                            Delete User
                        </DropdownMenuItem>
                    </DialogDeleteUser>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export { ColumnUserDropdownAction };
