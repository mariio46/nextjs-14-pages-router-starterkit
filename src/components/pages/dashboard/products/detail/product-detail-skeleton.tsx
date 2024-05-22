import { Skeleton } from '@/components/ui/skeleton';

interface ProductDetailSkeletonProps {}

export const ProductDetailSkeleton = ({}: ProductDetailSkeletonProps) => {
    return (
        <div className='flex gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
            <div className='min-w-52'>
                <div>
                    <span className='text-muted-foreground'>Product Name</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
                <div>
                    <span className='text-muted-foreground'>Product Description</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
                <div>
                    <span className='text-muted-foreground'>Product Price</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
            </div>
            <div className='min-w-52'>
                <div>
                    <span className='text-muted-foreground'>Last Created Product</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
                <div>
                    <span className='text-muted-foreground'>Last Updated Product</span>
                    <Skeleton className='w-full h-3.5' />
                </div>
            </div>
        </div>
    );
};
