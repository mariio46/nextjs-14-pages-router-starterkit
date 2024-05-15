import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface CardSkeletonProps {}

export const CardSkeleton = ({}: CardSkeletonProps) => {
    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle>
                    <Skeleton className='h-3.5 w-16' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col'>
                <Skeleton className='h-2 w-32' />
            </CardContent>
        </Card>
    );
};
