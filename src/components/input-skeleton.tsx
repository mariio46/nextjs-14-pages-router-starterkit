import { Skeleton } from './ui/skeleton';

interface InputSkeletonProps {}

export const InputSkeleton = ({}: InputSkeletonProps) => {
    return (
        <div className='space-y-1'>
            <Skeleton className='w-20 h-3' />
            <Skeleton className='w-full h-9' />
        </div>
    );
};
