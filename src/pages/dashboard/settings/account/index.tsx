import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';

import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { BreadcrumbDataType, ShellBreadcrumb } from '@/components/layouts/shells/shell-breadcrumb';
import { UpdateAccountForm } from '@/components/pages/dashboard/settings/account/update-account-form';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) return RedirectIfUnauthencated;

    return { props: {} };
}) satisfies GetServerSideProps;

const Account: NextPageWithLayout = () => {
    const breadcrumbData = [
        {
            as: 'link',
            link: '/settings',
            title: 'Settings',
        },
        {
            as: 'page',
            title: 'Account',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header
                title='Account Information'
                description='Update your name, username, and email to update your profile information.'
            />

            <section className='max-w-xl' id='update-account-form'>
                <UpdateAccountForm />
            </section>
        </SecondShell>
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
