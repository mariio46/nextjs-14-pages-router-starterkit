import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { now, toRupiah } from '@/lib/utils';

import { Icon } from '@/components/icon';
import { DataTableColumnDropdownAction } from '@/components/tanstack/data-table-column-dropdown-action';
import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { BaseProductType } from '@/types/api/data/products';
import { ProductDeleteDialog } from './product-delete-dialog';

export const productsColumn: ColumnDef<BaseProductType>[] = [
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
            <Link href={`/products/${row.original.id}`} className='hover:underline font-medium capitalize'>
                <div className='line-clamp-1'>{row.getValue('name')}</div>
            </Link>
        ),
        meta: { displayName: 'Name' },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{toRupiah(row.getValue('price'))}</div>,
        meta: { displayName: 'Price' },
    },
    {
        accessorKey: 'category.name',
        id: 'categoryName',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{row.getValue('categoryName')}</div>,
        meta: { displayName: 'Category' },
    },
    {
        accessorKey: 'type.name',
        id: 'typeName',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{row.getValue('typeName')}</div>,
        meta: { displayName: 'Type' },
    },
    {
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{now(row.original.created)}</div>,
        meta: { displayName: 'Created' },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => (
            <DataTableColumnDropdownAction>
                <DropdownMenuItem asChild>
                    <Link href={`/products/${row.original.id}`}>
                        <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/products/${row.original.id}/edit`}>
                        <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <ProductDeleteDialog product={row.original}>
                    <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                        <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                        Delete
                    </DropdownMenuItem>
                </ProductDeleteDialog>
            </DataTableColumnDropdownAction>
        ),
    },
];
