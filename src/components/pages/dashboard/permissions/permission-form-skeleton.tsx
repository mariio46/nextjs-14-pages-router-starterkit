import { ButtonSkeleton } from '@/components/button-skeleton';
import { InputSkeleton } from '@/components/input-skeleton';

interface PermissionFormSkeletonProps {}

export const PermissionFormSkeleton = ({}: PermissionFormSkeletonProps) => {
    return (
        <div className='space-y-3'>
            <InputSkeleton />
            <ButtonSkeleton />
        </div>
    );
};
