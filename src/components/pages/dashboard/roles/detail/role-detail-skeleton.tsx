import { CardSkeleton } from '@/components/card-skeleton';

export const RoleDetailSkeleton = () => {
    const arrays = Array.from({ length: 4 });

    return (
        <div className='grid gap-4 md:gap-8 xl:grid-cols-4'>
            {arrays.map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
};
