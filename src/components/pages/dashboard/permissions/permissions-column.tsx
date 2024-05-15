import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import type { PermissionIndexType } from '@/types/api/data/permissions';

import { diffForHumans } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DialogDeletePermission } from './dialog-delete-permission';

export const permissionsColumn: ColumnDef<PermissionIndexType>[] = [
    {
        id: '#',
        enableHiding: false,
        header: () => <div className='w-0.5 text-start'>#</div>,
        cell: ({ row }) => <div className='w-0.5 text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => {
            const permission = row.original;
            return (
                <div>
                    <Link href={`/permissions/${permission.id}`} className='font-medium capitalize hover:underline'>
                        {permission.name}
                    </Link>
                    <div className='font-normal text-muted-foreground text-sm'>{permission.guard}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'roles_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Total Attached Roles' />,
        cell: ({ row }) => <div>{`${row.getValue('roles_count')} Roles`}</div>,
    },
    {
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
        cell: ({ row }) => <div>{diffForHumans(row.original.created, true)}</div>,
    },
    {
        accessorKey: 'updated',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated' />,
        cell: ({ row }) => <div>{diffForHumans(row.original.updated, true)}</div>,
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
                <DialogDeletePermission permission={row.original}>
                    <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                        <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                        Delete
                    </DropdownMenuItem>
                </DialogDeletePermission>
            </DataTableColumnDropdownAction>
        ),
    },
];
