import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import type { PermissionIndexType } from '@/types/api/data/permissions';

import { now } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { PermissionDeleteDialog } from './permission-delete-dialog';

export const permissionsColumn: ColumnDef<PermissionIndexType>[] = [
    {
        id: '#',
        enableHiding: false,
        header: () => <div className='text-center'>#</div>,
        cell: ({ row }) => <div className='text-center text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => {
            const permission = row.original;
            return (
                <div className='whitespace-nowrap overflow-hidden'>
                    <Link href={`/permissions/${permission.id}`} className='font-medium capitalize hover:underline'>
                        {permission.name}
                    </Link>
                    <div className='font-normal text-muted-foreground text-sm'>{permission.guard}</div>
                </div>
            );
        },
        meta: { displayName: 'Name' },
    },
    {
        accessorKey: 'roles_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Total Attached Roles' />,
        cell: ({ row }) => (
            <div className='whitespace-nowrap overflow-hidden'>{`${row.getValue('roles_count')} Roles`}</div>
        ),
        meta: { displayName: 'Total Attached Roles' },
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
        enableHiding: false,
        cell: ({ row }) => (
            <DataTableColumnDropdownAction>
                <DropdownMenuItem asChild>
                    <Link href={`/permissions/${row.original.id}`}>
                        <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/permissions/${row.original.id}/edit`}>
                        <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <PermissionDeleteDialog permission={row.original}>
                    <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                        <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                        Delete
                    </DropdownMenuItem>
                </PermissionDeleteDialog>
            </DataTableColumnDropdownAction>
        ),
    },
];
