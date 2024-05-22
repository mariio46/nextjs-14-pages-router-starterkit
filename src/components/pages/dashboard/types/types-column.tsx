import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { now } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { TypeIndexType } from '@/types/api/data/product-types';
import { TypeDeleteDialog } from './type-delete-dialog';
import { TypeEditDialog } from './type-edit-dialog';

export const typesColumn: ColumnDef<TypeIndexType>[] = [
    {
        id: '#',
        enableHiding: false,
        header: () => <div className='text-center'>#</div>,
        cell: ({ row }) => <div className='text-center text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => (
            <Link href={`/types/${row.original.id}`} className='hover:underline font-medium capitalize'>
                <div className='line-clamp-1'>{row.getValue('name')}</div>
            </Link>
        ),
        meta: { displayName: 'Name' },
    },
    {
        accessorKey: 'slug',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Slug' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{row.getValue('slug')}</div>,
        meta: { displayName: 'Slug' },
    },
    {
        accessorKey: 'products_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Total Product' />,
        cell: ({ row }) => (
            <div className='whitespace-nowrap overflow-hidden'>{`${row.getValue('products_count')} Products`}</div>
        ),
        meta: { displayName: 'Total Products' },
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
                    <Link href={`/types/${row.original.id}`}>
                        <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                        View
                    </Link>
                </DropdownMenuItem>
                <TypeEditDialog type={row.original}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                        Edit
                    </DropdownMenuItem>
                </TypeEditDialog>
                <DropdownMenuSeparator />
                <TypeDeleteDialog type={row.original}>
                    <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                        <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                        Delete
                    </DropdownMenuItem>
                </TypeDeleteDialog>
            </DataTableColumnDropdownAction>
        ),
    },
];