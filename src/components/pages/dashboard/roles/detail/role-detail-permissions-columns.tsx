import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { now } from '@/lib/utils';
import { RoleShowPermissionType } from '@/types/api/data/roles';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const roleDetailPermissionsColumn: ColumnDef<RoleShowPermissionType>[] = [
    {
        id: '#',
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
