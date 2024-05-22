import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';

import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { UpdatePasswordForm } from '@/components/pages/dashboard/settings/security/update-password-form';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) return RedirectIfUnauthencated;

    return { props: {} };
}) satisfies GetServerSideProps;

const Security: NextPageWithLayout = () => {
    const breadcrumbData = [
        {
            as: 'link',
            link: '/settings',
            title: 'Settings',
        },
        {
            as: 'page',
            title: 'Security',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Security' description='Use a strong and random password for better security.' />

            <section className='max-w-xl' id='update-password-form'>
                <UpdatePasswordForm />
            </section>
        </SecondShell>
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
