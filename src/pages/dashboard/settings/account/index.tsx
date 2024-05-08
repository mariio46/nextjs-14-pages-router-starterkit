import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { UpdateAccountForm } from '@/components/pages/dashboard/settings/account/form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const Account: NextPageWithLayout = () => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href='/settings'>Settings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Account</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <HeaderPrimary className='my-5 space-y-0.5'>
                <HeaderPrimaryTitle className='text-base'>Account Information</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    Update your name, username, and email to update your profile information.
                    <span className='font-bold'>You can submit form if you make a changes.</span>
                </HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='update-account-form'>
                <div className='mx-auto max-w-7xl'>
                    <div className='max-w-xl'>
                        <UpdateAccountForm />
                    </div>
                </div>
            </section>
        </>
    );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Account'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Account;
