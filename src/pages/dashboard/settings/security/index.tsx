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
import { type NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
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
                    Make sure your account uses a long and random password to enhance security.
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
            <AuthStateProvider>
                <AuthLayout title='Security'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Security;
