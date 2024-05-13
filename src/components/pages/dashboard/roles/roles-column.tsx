import { diffForHumans } from '@/lib/utils';
import { RoleIndexType } from '@/types/api/data/roles';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { RolesColumnDropdownAction } from './roles-column-dropdown-action';

export const rolesColumn: ColumnDef<RoleIndexType>[] = [
    {
        id: '#',
        header: () => <div className='w-0.5 text-start'>#</div>,
        cell: ({ row }) => <div className='w-0.5 text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const role = row.original;
            return (
                <div>
                    <Link href={`/roles/${role.id}`} className='font-medium capitalize hover:underline'>
                        {role.name}
                    </Link>
                    <div className='font-normal text-muted-foreground text-sm'>{role.guard}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'permissions_count',
        header: () => <div className='text-center'>Total Permission</div>,
        cell: ({ row }) => <div className='text-center'>{`${row.getValue('permissions_count')} Permissions`}</div>,
    },
    {
        accessorKey: 'users_count',
        header: () => <div className='text-center'>Total User</div>,
        cell: ({ row }) => <div className='text-center'>{`${row.getValue('users_count')} Users`}</div>,
    },
    {
        accessorKey: 'created',
        header: () => <div className='text-center'>Created</div>,
        cell: ({ row }) => <div className='text-center'>{diffForHumans(row.original.created, true)}</div>,
    },
    {
        accessorKey: 'updated',
        header: () => <div className='text-center'>Updated</div>,
        cell: ({ row }) => <div className='text-center'>{diffForHumans(row.original.updated, true)}</div>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <RolesColumnDropdownAction role={row.original} />,
    },
];
