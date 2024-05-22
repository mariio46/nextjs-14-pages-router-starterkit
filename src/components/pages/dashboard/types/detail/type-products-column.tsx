import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { toRupiah } from '@/lib/utils';

import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { BaseProductType } from '@/types/api/data/products';

export const typeProductsColumn: ColumnDef<Omit<BaseProductType, 'slug' | 'description' | 'created' | 'updated'>>[] = [
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
        accessorKey: 'type.name',
        id: 'typeName',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{row.getValue('typeName')}</div>,
        meta: { displayName: 'Type' },
    },
    {
        accessorKey: 'category.name',
        id: 'categoryName',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
        cell: ({ row }) => <div className='whitespace-nowrap overflow-hidden'>{row.getValue('categoryName')}</div>,
        meta: { displayName: 'Category' },
    },
];
