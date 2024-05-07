import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SettingsCards } from '@/components/pages/dashboard/settings/settings-card';
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

const Settings: NextPageWithLayout = () => {
    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>Settings</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    Manage your account by using the correct account and updating your password regularly.
                </HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='settings-card' className='mt-5'>
                <SettingsCards />
            </section>
        </>
    );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Settings'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Settings;
