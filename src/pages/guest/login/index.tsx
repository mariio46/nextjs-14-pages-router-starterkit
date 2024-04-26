import { GuestLayout } from '@/components/layouts/guest-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';

const Login: NextPageWithLayout = () => {
    return (
        <>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolorem optio cumque nemo nihil
                iusto nam consequatur veniam, eos, sunt quaerat! Aliquam officia obcaecati perspiciatis.
            </p>
            <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
                Home
            </Link>
            <Link href='/register' className={cn(buttonVariants({ variant: 'outline' }))}>
                Register
            </Link>
        </>
    );
};

Login.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            <GuestLayout title='Login'>{page}</GuestLayout>
        </RootLayout>
    );
};

export default Login;
