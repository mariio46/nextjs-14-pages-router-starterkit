import { AppLayout } from '@/components/layouts/app-layout';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { ChuckNorrisData } from '@/types/chucknorris';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

// @ts-ignore
const Joke: NextPageWithLayout = ({ joke }: { joke: ChuckNorrisData }) => {
    // console.log(joke);
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
                    <p>{joke.value}</p>
                </CardContent>
                <CardFooter className='gap-4'>
                    <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }))}>
                        About
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

Joke.getLayout = function getLayout(page: ReactElement) {
    return <AppLayout title='Joke'>{page}</AppLayout>;
};

export default Joke;

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await axios.get('https://api.chucknorris.io/jokes/random');
    const joke = res.data;

    return {
        props: {
            joke,
        },
    };
}
