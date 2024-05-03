import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
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
            <AuthStateProvider>
                <AuthLayout title='Dashboard'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Dashboard;
