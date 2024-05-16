import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleRole } from '@/lib/api/data/roles/fetch-roles';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { EditRoleForm } from '@/components/pages/dashboard/roles/edit-role-form';

type RoleEditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const RoleEditPage: NextPageWithLayout<RoleEditPageProps> = ({ id: roleId }) => {
    const { role, isLoading, isError } = useFetchSingleRole(roleId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/roles',
            title: 'Roles',
        },
        {
            as: 'link',
            link: `/roles/${roleId}`,
            title: 'Detail Role',
        },
        {
            as: 'page',
            title: 'Edit Role',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Edit Role' description='This action will be update the role you choose.' />

            <section id='edit-role-form' className='max-w-xl'>
                {!isLoading && !isError && <EditRoleForm role={role!} />}
            </section>
        </SecondShell>
    );
};

RoleEditPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Edit Role'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default RoleEditPage;