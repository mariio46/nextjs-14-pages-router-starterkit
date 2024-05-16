import { diffForHumans } from '@/lib/utils';
import { RoleShowUserType } from '@/types/api/data/roles';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const roleDetailUsersColumn: ColumnDef<RoleShowUserType>[] = [
    {
        id: '#',
        header: () => <div className='w-0.5 text-start'>#</div>,
        cell: ({ row }) => <div className='w-0.5 text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div>
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
        header: () => <div className='text-center'>Created</div>,
        cell: ({ row }) => <div className='text-center'>{diffForHumans(row.original.created, true)}</div>,
    },
    {
        accessorKey: 'updated',
        header: () => <div className='text-center'>Updated</div>,
        cell: ({ row }) => <div className='text-center'>{diffForHumans(row.original.updated, true)}</div>,
    },
];