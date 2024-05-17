import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { BreadcrumbDataType, ShellBreadcrumb } from '@/components/layouts/shells/shell-breadcrumb';
import { CardDeleteAccount } from '@/components/pages/dashboard/settings/danger/card-delete-account';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const DeleteAccountPage: NextPageWithLayout = () => {
    const data = [
        {
            as: 'link',
            link: '/settings',
            title: 'Settings',
        },
        {
            as: 'page',
            title: 'Danger Area',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={data} />
            <SecondShell.Header title='Danger Area' description='This page is intended to delete your account.' />

            <section id='update-account-form'>
                <div className='max-w-xl'>
                    <CardDeleteAccount />
                </div>
            </section>
        </SecondShell>
    );
};

DeleteAccountPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Danger Area'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default DeleteAccountPage;
