import { Skeleton } from '../ui/skeleton';

export const ArticleSkeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props}>
            <Skeleton className='aspect-video rounded-lg' />
            <div className='mt-4 space-y-4'>
                <div className='line-clamp-1'>
                    <Skeleton className='w-[200px] h-[20px] rounded-full' />
                </div>
                <Skeleton className='w-full h-[15px] rounded-full' />
                <Skeleton className='w-full h-[15px] rounded-full' />
            </div>
        </div>
    );
};
