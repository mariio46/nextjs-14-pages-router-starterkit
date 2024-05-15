import { Skeleton } from './ui/skeleton';

interface ButtonSkeletonProps {}

export const ButtonSkeleton = ({}: ButtonSkeletonProps) => {
    return (
        <div>
            <Skeleton className='h-9 w-20' />
        </div>
    );
};
