import { AppLayout } from '@/components/layouts/app-layout';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChuckNorrisData } from '@/types/chucknorris';
import axios from 'axios';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

// @ts-ignore
const Home: NextPageWithLayout = ({ data }: { data: ChuckNorrisData }) => {
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
                    <p>{data.value}</p>
                </CardContent>
                <CardFooter className='gap-4'>
                    <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }))}>
                        About
                    </Link>
                    <Link href='/joke' className={cn(buttonVariants({ variant: 'outline' }))}>
                        Joke
                    </Link>
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
    return <AppLayout title='Home'>{page}</AppLayout>;
};

export default Home;

// This gets called on every request
export async function getServerSideProps() {
    const { data }: { data: ChuckNorrisData } = await axios.get('https://api.chucknorris.io/jokes/random');

    return { props: { data } };
}
