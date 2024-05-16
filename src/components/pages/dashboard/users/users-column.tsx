import { ColumnDef } from '@tanstack/react-table';

import type { UsersType } from '@/types/api/data/users';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { acronym } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { UserDeleteDialog } from './user-delete-dialog';

export const usersColumns: ColumnDef<UsersType>[] = [
    {
        id: '#',
        header: () => <div className='w-0.5 text-start'>#</div>,
        cell: ({ row }) => <div className='w-0.5 text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => <ColumnUserAvatar user={row.original} />,
        meta: { displayName: 'Name' },
    },
    {
        accessorKey: 'verified',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Verified' />,
        cell: ({ row }) => <div>{row.getValue('verified')}</div>,
        meta: { displayName: 'Verified' },
    },
    {
        accessorKey: 'joined',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Joined' />,
        cell: ({ row }) => <div>{row.getValue('joined')}</div>,
        meta: { displayName: 'Joined' },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ColumnAction user={row.original} />,
    },
];

const ColumnAction = ({ user }: { user: UsersType }) => {
    const { copyUsernameToClipboard } = useCopyToClipboard();

    return (
        <DataTableColumnDropdownAction>
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
            <UserDeleteDialog user={user}>
                <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                    <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                    Delete User
                </DropdownMenuItem>
            </UserDeleteDialog>
        </DataTableColumnDropdownAction>
    );
};

const ColumnUserAvatar = ({ user }: { user: UsersType }) => {
    return (
        <div className='flex items-center gap-3 w-[400px]'>
            <div className='flex-shrink-0'>
                <Avatar className='size-12'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{acronym(user.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <Link href={`/users/${user.username}`} className='hover:underline'>
                    <div className='font-medium'>{user.name}</div>
                </Link>
                <div className='font-normal text-muted-foreground text-sm'>{user.username}</div>
                <div className='font-normal text-muted-foreground text-sm'>{user.email}</div>
            </div>
        </div>
    );
};
