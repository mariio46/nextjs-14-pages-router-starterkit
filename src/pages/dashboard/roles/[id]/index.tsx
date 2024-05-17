import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleRole } from '@/lib/api/data/roles/fetch-roles';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { RoleDetailAction } from '@/components/pages/dashboard/roles/detail/role-detail-action';
import { RoleDetailBlocks } from '@/components/pages/dashboard/roles/detail/role-detail-blocks';

type RoleDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const RoleDetailPage: NextPageWithLayout<RoleDetailPageProps> = ({ id: roleId }) => {
    const { role, status } = useFetchSingleRole(roleId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/roles',
            title: 'Roles',
        },
        {
            as: 'page',
            title: 'Detail Role',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer>
                <SecondShell.Header
                    className='my-0'
                    title='Detail Role'
                    description='Detail role that contain their information like permission that role have and which user is assign to this role.'
                />
                <RoleDetailAction role={role!} />
            </SecondShell.HeaderContainer>

            <section id='detail-role'>
                <RoleDetailBlocks role={role!} status={status} />
            </section>
        </SecondShell>
    );
};

RoleDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail Role'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default RoleDetailPage;
