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
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import Link from 'next/link';

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

            <HeaderPrimary className='my-5'>
                <HeaderPrimaryTitle className='text-base'>Account Information</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    Update your account&apos;s profile information and email address.
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
            <AuthStateProvider>
                <AuthLayout title='Account'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Account;
