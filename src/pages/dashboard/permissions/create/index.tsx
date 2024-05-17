import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { PermissionCreateForm } from '@/components/pages/dashboard/permissions/permission-create-form';

type PermissionCreatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const PermissionCreatePage: NextPageWithLayout<PermissionCreatePageProps> = () => {
    const breadcrumbData = [
        {
            as: 'link',
            link: '/permissions',
            title: 'Permissions',
        },
        {
            as: 'page',
            title: 'Create Permission',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header
                title='Create New Permission'
                description='This action allows you to define a new permission. Enter the name of the permission and submit the form.'
            />

            <section id='create-permission-form' className='max-w-xl'>
                <PermissionCreateForm />
            </section>
        </SecondShell>
    );
};

PermissionCreatePage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Create Permission'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default PermissionCreatePage;
