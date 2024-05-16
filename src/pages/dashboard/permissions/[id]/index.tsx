import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSinglePermission } from '@/lib/api/data/permissions/fetch-permissions';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { PermissionDetailAction } from '@/components/pages/dashboard/permissions/detail/permission-detail-action';
import { PermissionDetailBlocks } from '@/components/pages/dashboard/permissions/detail/permission-detail-blocks';

type PermissionDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const PermissionDetailPage: NextPageWithLayout<PermissionDetailPageProps> = ({ id: permissionId }) => {
    const { permission, isError, isLoading, status } = useFetchSinglePermission(permissionId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/permissions',
            title: 'Permissions',
        },
        {
            as: 'page',
            title: 'Detail permission',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer>
                <SecondShell.Header
                    title='Detail Permission'
                    description='Detail permission that contain their information like role that permission have .'
                />
                <PermissionDetailAction permission={permission!} status={status} />
            </SecondShell.HeaderContainer>

            <section id='detail-permission'>
                <PermissionDetailBlocks
                    permission={permission!}
                    isError={isError}
                    isLoading={isLoading}
                    status={status}
                />
            </section>
        </SecondShell>
    );
};

PermissionDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail Permission'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default PermissionDetailPage;
