import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchAllRoles } from '@/lib/api/data/roles/fetch-roles';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { rolesColumn } from '@/components/pages/dashboard/roles/roles-column';
import { RolesDataTable } from '@/components/pages/dashboard/roles/roles-data-table';

type RolesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const RolesPage: NextPageWithLayout<RolesPageProps> = () => {
    const { data, isLoading, isError } = useFetchAllRoles();

    return (
        <FirstShell>
            <FirstShell.Header
                title='Roles'
                description='The table below is a list of all roles and the permissions attached to these roles.'
            />

            <section id='roles-table' className='my-5'>
                <RolesDataTable
                    columns={rolesColumn}
                    data={data?.data.roles!}
                    isLoading={isLoading}
                    isError={isError}
                />
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