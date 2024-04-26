import { GuestLayout } from '@/components/layouts/guest-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';

const Register: NextPageWithLayout = () => {
    return (
        <>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui hic molestias iste fuga ex accusamus quo
                veritatis pariatur quae reiciendis dicta aliquid veniam laboriosam eligendi saepe animi nihil quod amet,
                dolor facilis corporis aspernatur iure. Alias corporis officiis a rem veritatis perspiciatis minus eius
                accusamus quam? Dolores ut perspiciatis autem!
            </p>
            <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
                Home
            </Link>
            <Link href='/login' className={cn(buttonVariants({ variant: 'outline' }))}>
                Login
            </Link>
        </>
    );
};

Register.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            <GuestLayout title='Register'>{page}</GuestLayout>
        </RootLayout>
    );
};

export default Register;
