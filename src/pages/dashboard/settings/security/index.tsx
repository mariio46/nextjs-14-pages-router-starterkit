import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { UpdatePasswordForm } from '@/components/pages/dashboard/settings/security/form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getServerSideAuthUserData } from '@/lib/api/data/auth/user';
import { type NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const Security: NextPageWithLayout = () => {
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
                        <BreadcrumbPage>Security</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <HeaderPrimary className='my-5 space-y-0.5'>
                <HeaderPrimaryTitle className='text-base'>Security</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    Use a strong and random password for better security.
                    <span className='font-bold'>You&apos;ll be logged out after changing your password.</span>
                </HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='update-account-form'>
                <div className='mx-auto max-w-7xl'>
                    <div className='max-w-xl'>
                        <UpdatePasswordForm />
                    </div>
                </div>
            </section>
        </>
    );
};

Security.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Security'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Security;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await getServerSideAuthUserData({ req, res });
    if (token_status.isUnauthenticated) return { redirect: token_status?.redirect! };

    return { props: {} };
}) satisfies GetServerSideProps;
