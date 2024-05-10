import { Skeleton } from '@/components/ui/skeleton';

export const DetailUserSkeleton: React.FC = () => {
    return (
        <div className='flex items-start gap-10'>
            <div className='rounded-md overflow-hidden'>
                <Skeleton className='size-[250px]' />
            </div>
            <div className='flex gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
                <div className='min-w-52'>
                    <div>
                        <span className='text-muted-foreground'>Name</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Username</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Email</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Verified at</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                </div>
                <div className='min-w-52'>
                    <div>
                        <span className='text-muted-foreground'>Joined</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Last Updated Account</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Last Updated Password</span>
                        <Skeleton className='w-full h-3.5' />
                    </div>
                </div>
            </div>
        </div>
    );
};
