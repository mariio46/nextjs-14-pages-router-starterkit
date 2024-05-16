import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSinglePermission } from '@/lib/api/data/permissions/fetch-permissions';

import { FormSkeleton } from '@/components/form-skeleton';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { PermissionEditForm } from '@/components/pages/dashboard/permissions/permission-edit-form';

type PermissionEditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const PermissionEditPage: NextPageWithLayout<PermissionEditPageProps> = ({ id: permissionId }) => {
    const { permission, status } = useFetchSinglePermission(permissionId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/permissions',
            title: 'Permissions',
        },
        {
            as: 'link',
            link: `/permissions/${permissionId}`,
            title: 'Detail Permission',
        },
        {
            as: 'page',
            title: 'Edit permission',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header
                title='Edit Permission'
                description='This action will be update the permission you choose.'
            />

            <section id='edit-permission-form' className='max-w-xl'>
                {status === 'success' ? (
                    <PermissionEditForm permission={permission!} />
                ) : (
                    <FormSkeleton inputLength={1} />
                )}
            </section>
        </SecondShell>
    );
};

PermissionEditPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Edit Role'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default PermissionEditPage;
