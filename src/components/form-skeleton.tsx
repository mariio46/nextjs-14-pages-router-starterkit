import { Skeleton } from './ui/skeleton';

interface FormSkeletonProps {
    inputLength?: number;
}

export const FormSkeleton = ({ inputLength = 2 }: FormSkeletonProps) => {
    const arrays = Array.from({ length: inputLength });

    return (
        <div className='space-y-3'>
            {arrays.map((_, i) => (
                <div className='space-y-1' key={i}>
                    <Skeleton className='w-28 h-3' />
                    <Skeleton className='w-full h-9' />
                </div>
            ))}
            <Skeleton className='h-9 w-20' />
        </div>
    );
};
