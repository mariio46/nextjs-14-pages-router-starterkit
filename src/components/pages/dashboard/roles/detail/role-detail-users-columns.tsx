import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { now } from '@/lib/utils';
import { RoleShowUserType } from '@/types/api/data/roles';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const roleDetailUsersColumn: ColumnDef<RoleShowUserType>[] = [
    {
        id: '#',
        header: () => <div className='text-center'>#</div>,
        cell: ({ row }) => <div className='text-center text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className='whitespace-nowrap overflow-hidden'>
                    <Link href={`/users/${user.username}`} className='font-medium capitalize hover:underline'>
                        {user.name}
                    </Link>
                    <div className='font-normal text-muted-foreground text-sm'>{user.username}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{now(row.original.created)}</div>,
    },
    {
        accessorKey: 'updated',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{now(row.original.updated)}</div>,
    },
];
