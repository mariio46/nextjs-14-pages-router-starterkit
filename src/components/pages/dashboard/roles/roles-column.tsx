import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { RoleIndexType } from '@/types/api/data/roles';

import { now } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { RoleDeleteDialog } from './role-delete-dialog';

export const rolesColumn: ColumnDef<RoleIndexType>[] = [
    {
        id: '#',
        header: () => <div className='text-center'>#</div>,
        cell: ({ row }) => <div className='text-center text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => {
            const role = row.original;
            return (
                <div className='whitespace-nowrap overflow-hidden'>
                    <Link href={`/roles/${role.id}`} className='font-medium capitalize hover:underline'>
                        {role.name}
                    </Link>
                    <div className='font-normal text-muted-foreground text-sm'>{role.guard}</div>
                </div>
            );
        },
        meta: { displayName: 'Name' },
    },
    {
        accessorKey: 'permissions_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Total Permission' />,
        cell: ({ row }) => (
            <div className='whitespace-nowrap overflow-hidden'>{`${row.getValue('permissions_count')} Permissions`}</div>
        ),
        meta: { displayName: 'Total Permissions' },
    },
    {
        accessorKey: 'users_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Total User' />,
        cell: ({ row }) => (
            <div className='whitespace-nowrap overflow-hidden'>{`${row.getValue('users_count')} Users`}</div>
        ),
        meta: { displayName: 'Total Users' },
    },
    {
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{now(row.original.created)}</div>,
        meta: { displayName: 'Created' },
    },
    {
        accessorKey: 'updated',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{now(row.original.updated)}</div>,
        meta: { displayName: 'Updated' },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const role = row.original;

            return (
                <DataTableColumnDropdownAction>
                    <DropdownMenuItem asChild>
                        <Link href={`/roles/${role.id}`}>
                            <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/roles/${role.id}/edit`}>
                            <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <RoleDeleteDialog role={role}>
                        <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                            <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                            Delete
                        </DropdownMenuItem>
                    </RoleDeleteDialog>
                </DataTableColumnDropdownAction>
            );
        },
    },
];
