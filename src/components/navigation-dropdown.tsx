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
import { User } from '@/types/user';
import Link from 'next/link';
import { Icon } from './icon';

export const NavigationDropdown = ({ user }: { user: User | null }) => {
    const { logout, loading } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='size-9 cursor-pointer'>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{acronym(user?.name!)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-full min-w-[8rem]'>
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
                    <Link href='/profile'>
                        <Icon name='IconBrandSpeedtest' className='mr-1.5 stroke-[1.3]' />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/'>
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
