import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { getServerSideAuthUserData } from '@/lib/api/data/auth/user';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';

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

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await getServerSideAuthUserData({ req, res });
    if (token_status.isUnauthenticated) return { redirect: token_status?.redirect! };

    return { props: {} };
}) satisfies GetServerSideProps;
