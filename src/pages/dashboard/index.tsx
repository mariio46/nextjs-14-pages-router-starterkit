import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { type GetServerSideProps } from 'next';
import { type NextPageWithLayout } from '../_app';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const Dashboard: NextPageWithLayout = () => {
    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>Dashboard</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>Welcome to your dashboard page.</HeaderPrimaryDescription>
            </HeaderPrimary>
        </>
    );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Dashboard'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Dashboard;
