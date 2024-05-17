import Link from 'next/link';

import { useLogout } from '@/lib/api/data/auth/logout';
import { useHasPermission } from '@/lib/utilities/role-permission-utils';
import { acronym, cn } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from './icon';

export const NavigationDropdown = () => {
    const user = useAuthUserState((state) => state.user);
    const { logout, loading } = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='size-9 cursor-pointer'>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{acronym(user?.name!)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-full min-w-[15rem] mt-2 z-[61]'>
                <DropdownMenuLabel>
                    <div className='relative flex items-center font-normal'>
                        <Avatar className='size-8'>
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{acronym(user?.name!)}</AvatarFallback>
                        </Avatar>
                        <div className='ml-3'>
                            <strong className='inline-flex items-center font-semibold'>{user?.name}</strong>
                            <div className='text-muted-foreground'>{user?.email}</div>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/dashboard'>
                        <Icon name='IconBrandSpeedtest' className='mr-1.5 stroke-[1.3]' />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <Link href='/settings' className='w-full'>
                        <DropdownMenuSubTrigger>
                            <Icon name='IconSettings' className='me-1.5 stroke-[1.3]' />
                            Settings
                        </DropdownMenuSubTrigger>
                    </Link>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className='z-[62] w-[10rem]'>
                            <DropdownMenuItem asChild>
                                <Link href='/settings/account'>
                                    <Icon name='IconUserCircle' className='mr-1.5 stroke-[1.3]' />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href='/settings/security'>
                                    <Icon name='IconShield' className='mr-1.5 stroke-[1.3]' />
                                    Security
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href='/settings/danger' className='focus:text-destructive'>
                                    <Icon name='IconAlertTriangle' className='mr-1.5 stroke-[1.3]' />
                                    Danger Area
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                {useHasPermission('management users') && (
                    <DropdownMenuItem asChild>
                        <Link href='/users'>
                            <Icon name='IconUsersGroup' className='mr-1.5 stroke-[1.3]' />
                            Users
                        </Link>
                    </DropdownMenuItem>
                )}
                {useHasPermission('management role permission') && (
                    <DropdownMenuItem asChild>
                        <Link href='/roles'>
                            <Icon name='IconSpy' className='mr-1.5 stroke-[1.3]' />
                            Roles
                        </Link>
                    </DropdownMenuItem>
                )}
                {useHasPermission('management role permission') && (
                    <DropdownMenuItem asChild>
                        <Link href='/permissions'>
                            <Icon name='IconLicense' className='mr-1.5 stroke-[1.3]' />
                            Permissions
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} disabled={loading}>
                    <Icon
                        name={!loading ? 'IconLogout' : 'IconLoader'}
                        className={cn('mr-1.5 stroke-[1.3]', loading && 'animate-spin')}
                    />
                    {!loading ? 'Logout' : 'Logout...'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
