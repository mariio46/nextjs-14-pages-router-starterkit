import { AppLayout } from '@/components/layouts/app-layout';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import { ReactElement } from 'react';

const Register: NextPageWithLayout = () => {
    return (
        <div className='max-w-2xl min-w-[42rem]'>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, illo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis aliquam sunt
                        distinctio laboriosam numquam excepturi ullam ipsa laudantium provident, repellendus id,
                        mollitia culpa possimus.
                    </p>
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

Register.getLayout = function getLayout(page: ReactElement) {
    return <AppLayout title='Register'>{page}</AppLayout>;
};

export default Register;
