import { Counter } from '@/components/counter';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';

const Home = () => {
    return (
        <div className='flex items-center gap-6 justify-center'>
            <Counter />
        </div>
    );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthStateProvider>
                <AppLayout title='Home'>{page}</AppLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Home;

// import { AppLayout } from '@/components/layouts/app-layout';
// import { RootLayout } from '@/components/layouts/root-layout';
// import { Skeleton } from '@/components/ui/skeleton';
// import { fetcher } from '@/lib/swr-fetcher';
// import { ArticleType } from '@/types/article';
// import { ReactElement } from 'react';
// import useSWR from 'swr';
// import { NextPageWithLayout } from '../_app';

// export const ProductSkeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {
//     return (
//         <div {...props}>
//             <Skeleton className='aspect-video rounded-lg' />
//             <div className='mt-4 space-y-4'>
//                 <div className='line-clamp-1'>
//                     <Skeleton className='w-[200px] h-[20px] rounded-full' />
//                 </div>
//                 <Skeleton className='w-full h-[15px] rounded-full' />
//                 <Skeleton className='w-full h-[15px] rounded-full' />
//                 {/* <div className='flex items-center justify-between'>
//                     <Skeleton className='w-[100px] h-[15px] rounded-full' />
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export const ProductBlock = ({ product }: { product: ArticleType }) => {
//     return (
//         <div>
//             {/* object-contain h-80 w-full */}
//             <img src={product.image} alt={product.title} className='aspect-video rounded-lg' />
//             <div className='mt-4 space-y-4'>
//                 <div className='line-clamp-1'>
//                     <h3 className='text-lg font-medium text-foreground'>{product.title}</h3>
//                 </div>
//                 <div className='b-4 line-clamp-2 text-sm text-muted-foreground'>{product.body}</div>
//                 {/* <div className='flex items-center justify-between'>
//                     <span className='gap-x-4 text-xs tracking-tighter text-foreground font-medium'>
//                         {product.price}
//                     </span>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// const Home: NextPageWithLayout = () => {
//     // const { data, isLoading, error } = useSWR<FakeStoreType[]>('https://fakestoreapi.com/products', fetcher);
//     const { data, isLoading, error } = useSWR<ArticleType[]>('http://localhost:8080/api/articles', fetcher);
//     if (error) return <div>No Data</div>;

//     if (isLoading) {
//         return (
//             <div className='grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-x-4 lg:gap-x-20 lg:gap-y-24'>
//                 {Array.from({ length: 12 }).map((_, i) => (
//                     <ProductSkeleton key={i} />
//                 ))}
//             </div>
//         );
//     }

//     console.log(data);

//     return (
//         <>
//             <div className='grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-x-4 lg:gap-x-20 lg:gap-y-24'>
//                 {data?.map((product: ArticleType, i) => <ProductBlock key={i} product={product} />)}
//                 {/* Hello */}
//             </div>
//         </>
//     );
// };

// Home.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <RootLayout>
//             <AppLayout title='Home'>{page}</AppLayout>
//         </RootLayout>
//     );
// };

// export default Home;
