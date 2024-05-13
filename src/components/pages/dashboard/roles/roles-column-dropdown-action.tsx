import Link from 'next/link';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { RoleIndexType } from '@/types/api/data/roles';
import { DialogDeleteRole } from './dialog-delete-role';
import { DialogEditRole } from './dialog-edit-role';

export const RolesColumnDropdownAction: React.FC<{ role: RoleIndexType }> = ({ role }) => {
    const { toggleDialog: setDeleteUserDialog, openDialog: deleteUserDialog } = useToggleDialog();
    const { toggleDialog: setUpdateUserDialog, openDialog: updateUserDialog } = useToggleDialog();

    return (
        <div className='text-end'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='h-5' size='icon'>
                        <span className='sr-only'>Open menu</span>
                        <Icon name='IconDots' className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[12rem] z-[61]'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/roles/${role.id}`}>
                            <Icon name='IconEye' className='me-1.5 stroke-[1.3]' />
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DialogEditRole open={updateUserDialog} onOpenChange={setUpdateUserDialog} role={role}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Icon name='IconEdit' className='me-1.5 stroke-[1.3]' />
                            Edit
                        </DropdownMenuItem>
                    </DialogEditRole>
                    <DropdownMenuSeparator />
                    <DialogDeleteRole open={deleteUserDialog} onOpenChange={setDeleteUserDialog} role={role}>
                        <DropdownMenuItem className='focus:text-destructive' onSelect={(e) => e.preventDefault()}>
                            <Icon name='IconTrash' className='me-1.5 stroke-[1.3]' />
                            Delete
                        </DropdownMenuItem>
                    </DialogDeleteRole>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
