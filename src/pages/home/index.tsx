import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/swr-fetcher';
import { cn } from '@/lib/utils';
import { ChuckNorrisData } from '@/types/chucknorris';
import Link from 'next/link';
import { ReactElement } from 'react';
import useSWR from 'swr';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
    const { data, isLoading, error } = useSWR<ChuckNorrisData>('https://api.chucknorris.io/jokes/random', fetcher);

    return (
        <div className='max-w-2xl min-w-[42rem]'>
            <Card>
                <CardHeader>
                    <CardTitle>Conclusion</CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, possimus.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!error ? (
                        <>
                            {isLoading ? (
                                <Skeleton className='h-4 w-[250px]' />
                            ) : (
                                <p className='text-sm text-muted-foreground'>{data?.value}</p>
                            )}
                        </>
                    ) : (
                        <p className='text-destructive font-medium animate-pulse text-sm'>
                            {error.response.data.message} | {error.response.data.status}
                        </p>
                    )}
                </CardContent>
                <CardFooter className='gap-4'>
                    <Link href='/login' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Login
                    </Link>
                    <Link href='/register' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Register
                    </Link>
                    <ThemeToggle />
                </CardFooter>
            </Card>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Home'>{page}</AppLayout>
        </RootLayout>
    );
};

export default Home;
