import { Skeleton } from '@/components/ui/skeleton';

interface TypeDetailSkeletonProps {}

export const TypeDetailSkeleton = ({}: TypeDetailSkeletonProps) => {
    return (
        <div className='flex gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
            <div className='min-w-52'>
                <div>
                    <span className='text-muted-foreground'>Name</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
                <div>
                    <span className='text-muted-foreground'> Slug</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
            </div>
            <div className='min-w-52'>
                <div>
                    <span className='text-muted-foreground'>Last Created </span>
                    <Skeleton className='w-full h-3.5' />
                </div>
                <div>
                    <span className='text-muted-foreground'>Last Updated </span>
                    <Skeleton className='w-full h-3.5' />
                </div>
            </div>
        </div>
    );
};
