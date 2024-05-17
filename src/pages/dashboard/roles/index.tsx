import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchAllRoles } from '@/lib/api/data/roles/fetch-roles';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { Link } from '@/components/link';
import { rolesColumn } from '@/components/pages/dashboard/roles/roles-column';
import { DataTable } from '@/components/tanstack/data-table';

type RolesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const RolesPage: NextPageWithLayout<RolesPageProps> = () => {
    const { roles, status } = useFetchAllRoles();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Roles'
                    description='The table below is a list of all roles and the permissions attached to these roles.'
                />
                <Link href='/roles/create'>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Create Role
                </Link>
            </FirstShell.HeaderContainer>

            <section id='roles-table' className='my-5'>
                <DataTable columns={rolesColumn} data={roles!} status={status} filterKey='name' />
            </section>
        </FirstShell>
    );
};

RolesPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Roles'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default RolesPage;
