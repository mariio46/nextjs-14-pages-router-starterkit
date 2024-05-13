import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RoleDetailSkeleton = () => {
    const data = Array.from({ length: 4 });

    return (
        <div className='grid gap-4 md:gap-8 xl:grid-cols-4'>
            {data.map((_, i) => (
                <Card key={i}>
                    <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle>
                            <Skeleton className='h-3.5 w-16' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col'>
                        <Skeleton className='h-2 w-32' />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
