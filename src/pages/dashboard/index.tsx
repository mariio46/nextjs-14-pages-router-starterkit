import { type GetServerSideProps } from 'next';
import { type NextPageWithLayout } from '../_app';

import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const Dashboard: NextPageWithLayout = () => {
    return (
        <FirstShell>
            <FirstShell.Header title='Dashboard' description='Welcome to your dashboard page.' />

            <section id='dashboard-page' className='space-y-4 my-5'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam corporis provident quia tenetur
                    maxime, atque expedita sint. Veritatis dignissimos itaque sit earum, perferendis illum voluptatibus.
                </p>
            </section>
        </FirstShell>
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
