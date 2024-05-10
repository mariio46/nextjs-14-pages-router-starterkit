import { UsersType } from '@/types/api/data/users';
import { ColumnDef } from '@tanstack/react-table';
import { ColumnUserAvatar } from './column-user-avatar';
import { ColumnUserDropdownAction } from './column-user-dropdown-action';

export const userColumns: ColumnDef<UsersType>[] = [
    {
        id: '#',
        header: () => <div className='w-[10px] text-start'>#</div>,
        cell: ({ row }) => <div className='w-[10px] text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <ColumnUserAvatar user={row.original} />,
    },
    {
        accessorKey: 'verified',
        header: () => <div className='text-center'>Verified</div>,
        cell: ({ row }) => <div className='text-center'>{row.getValue('verified')}</div>,
    },
    {
        accessorKey: 'joined',
        header: () => <div className='text-center'>Joined</div>,
        cell: ({ row }) => <div className='text-center'>{row.getValue('joined')}</div>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <ColumnUserDropdownAction user={row.original} />,
    },
];
