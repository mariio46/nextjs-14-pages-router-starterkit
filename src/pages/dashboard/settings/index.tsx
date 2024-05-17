import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';

import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { SettingsCards } from '@/components/pages/dashboard/settings/settings-card';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const Settings: NextPageWithLayout = () => {
    return (
        <FirstShell>
            <FirstShell.Header
                title='Settings'
                description='Manage your account by using the correct account and updating your password regularly.'
            />

            <section id='settings-card' className='my-5'>
                <SettingsCards />
            </section>
        </FirstShell>
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
