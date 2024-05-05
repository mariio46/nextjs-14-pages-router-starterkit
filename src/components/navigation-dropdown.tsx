import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { acronym } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import Link from 'next/link';
import { Icon } from './icon';

export const NavigationDropdown = () => {
    const user = useAuthUserState((state) => state.user);
    const { logout, loading } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='size-9 cursor-pointer'>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{acronym(user?.name!)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-full min-w-[8rem] z-[61]'>
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
                <DropdownMenuItem asChild>
                    <Link href='/settings'>
                        <Icon name='IconSettings' className='mr-1.5 stroke-[1.3]' />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} disabled={loading}>
                    {!loading ? (
                        <>
                            <Icon name='IconLogout' className='mr-1.5 stroke-[1.3]' />
                            Logout
                        </>
                    ) : (
                        <>
                            <Icon name='IconLoader' className='mr-1.5 stroke-[1.3] animate-spin' />
                            Logout...
                        </>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
