import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchAllPermissions } from '@/lib/api/data/permissions/fetch-permissions';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { Link } from '@/components/link';
import { permissionsColumn } from '@/components/pages/dashboard/permissions/permissions-column';
import { DataTable } from '@/components/tanstack/data-table';

type PermissionsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return {
        props: {},
    };
}) satisfies GetServerSideProps;

const PermissionsPage: NextPageWithLayout<PermissionsPageProps> = () => {
    const { permissions, status } = useFetchAllPermissions();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Permissions'
                    description='The table below is a list of all permissions that attached to every role.'
                />
                <Link href='/permissions/create'>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Create Permission
                </Link>
            </FirstShell.HeaderContainer>

            <section id='permissions-table' className='my-5'>
                <DataTable status={status} data={permissions!} columns={permissionsColumn} filterKey='name' />
            </section>
        </FirstShell>
    );
};

PermissionsPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Permissions'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default PermissionsPage;
