import { DropdownAlertDialog } from '@/components/dropdown-alert-dialog';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { useDeleteUser } from '@/lib/api/data/users/delete-user';
import { acronym } from '@/lib/utils';
import { User } from '@/types/api/feature/users';
import { ColumnDef } from '@tanstack/react-table';

export const userColumns: ColumnDef<User>[] = [
    {
        id: '#',
        header: () => <div className='w-[10px] text-start'>#</div>,
        cell: ({ row }) => <div className='w-[10px] text-start text-muted-foreground'>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <TableUserAvatar user={row.original} />,
    },
    {
        accessorKey: 'verified',
        header: () => <div className='text-center'>Verified</div>,
        cell: ({ row }) => <div className='text-center'>{row.getValue('verified')}</div>,
    },
    {
        accessorKey: 'joined',
        header: () => <div className='text-center'>Joined</div>,
        cell: ({ row }) => <div className='text-center'>{row.getValue('joined')}</div>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <TableUserDropdownAction user={row.original} />,
    },
];

const TableUserAvatar: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className='flex items-center gap-3 w-[400px]'>
            <div className='flex-shrink-0'>
                <Avatar className='size-12'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{acronym(user.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className='font-medium'>{user.name}</div>
                <div className='font-normal text-muted-foreground text-sm'>{user.username}</div>
                <div className='font-normal text-muted-foreground text-sm'>{user.email}</div>
            </div>
        </div>
    );
};

const TableUserDropdownAction: React.FC<{ user: User }> = ({ user }) => {
    const { copyUsernameToClipboard } = useCopyToClipboard();
    const { openAlertDialog, toggleAlertDialog } = useToggleDialog();
    const { handleDeleteUser, isPending } = useDeleteUser();

    return (
        <div className='text-end'>
            <DropdownMenu key={user.id}>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' disabled={isPending} className='h-5' size='icon'>
                        <span className='sr-only'>Open menu</span>
                        <Icon name='IconDots' className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[12rem] z-[61]'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => copyUsernameToClipboard(user.username)}>
                        <Icon name='IconClipboard' className='me-1.5 stroke-[1.3]' />
                        Copy username
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Icon name='IconBan' className='me-1.5 stroke-[1.3]' />
                        Ban User
                    </DropdownMenuItem>
                    <DropdownAlertDialog
                        AlertDialogKey={user.id}
                        trigger_text='Delete'
                        trigger_icon='IconTrash'
                        open={openAlertDialog}
                        onOpenChange={toggleAlertDialog}
                        action={() => handleDeleteUser(user.username)}
                        action_text='Delete'
                        description='This action cannot be undone. This will permanently delete this user and remove data from our
                        servers'
                        disabledWhen={isPending}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
