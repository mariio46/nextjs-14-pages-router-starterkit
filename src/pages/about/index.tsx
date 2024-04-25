import { AppLayout } from '@/components/layouts/app-layout';
import { Loading } from '@/components/loading';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fetcher } from '@/lib/swr-fetcher';
import { cn } from '@/lib/utils';
import { ChuckNorrisData } from '@/types/chucknorris';
import Link from 'next/link';
import { ReactElement } from 'react';
import useSWR from 'swr';
import { NextPageWithLayout } from '../_app';

const About: NextPageWithLayout = () => {
    const { data, isLoading } = useSWR<ChuckNorrisData>('https://api.chucknorris.io/jokes/random', fetcher);
    if (isLoading) return <Loading />;
    return (
        <div className='max-w-2xl min-w-[42rem]'>
            <Card>
                <CardHeader>
                    <CardTitle>Conclusion</CardTitle>
                    <CardDescription>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, illo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{data?.value}</p>
                </CardContent>
                <CardFooter className='gap-4'>
                    <Link href='/joke' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Joke
                    </Link>
                    <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Home
                    </Link>
                    <ThemeToggle />
                </CardFooter>
            </Card>
        </div>
    );
};

About.getLayout = function getLayout(page: ReactElement) {
    return <AppLayout title='About'>{page}</AppLayout>;
};

export default About;
