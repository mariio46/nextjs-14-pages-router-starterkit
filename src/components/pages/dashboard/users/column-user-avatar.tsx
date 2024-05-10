import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { acronym } from '@/lib/utils';
import type { UsersType } from '@/types/api/data/users';
import Link from 'next/link';

export const ColumnUserAvatar: React.FC<{ user: UsersType }> = ({ user }) => {
    return (
        <div className='flex items-center gap-3 w-[400px]'>
            <div className='flex-shrink-0'>
                <Avatar className='size-12'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{acronym(user.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <Link href={`/users/${user.username}`} className='hover:underline'>
                    <div className='font-medium'>{user.name}</div>
                </Link>
                <div className='font-normal text-muted-foreground text-sm'>{user.username}</div>
                <div className='font-normal text-muted-foreground text-sm'>{user.email}</div>
            </div>
        </div>
    );
};
