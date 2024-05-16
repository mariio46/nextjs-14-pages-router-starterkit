import { DataTableColumnHeader } from '@/components/tanstack/data-table-column-header';
import { diffForHumans } from '@/lib/utils';
import { RoleShowPermissionType } from '@/types/api/data/roles';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const roleDetailPermissionsColumn: ColumnDef<RoleShowPermissionType>[] = [
    {
        id: '#',
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
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
        cell: ({ row }) => <div>{diffForHumans(row.original.created, true)}</div>,
    },
    {
        accessorKey: 'updated',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Updated' />,
        cell: ({ row }) => <div>{diffForHumans(row.original.updated, true)}</div>,
    },
];
