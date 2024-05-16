import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { FormSkeleton } from '@/components/form-skeleton';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { RoleCreateForm } from '@/components/pages/dashboard/roles/role-create-form';
import { usePermissionFormData } from '@/lib/api/data/permissions/fetch-permissions';

type RoleCreatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const RoleCreatePage: NextPageWithLayout<RoleCreatePageProps> = () => {
    const { formData, status: formDataStatus } = usePermissionFormData();

    const breadcrumbData = [
        {
            as: 'link',
            link: '/roles',
            title: 'Roles',
        },
        {
            as: 'page',
            title: 'Create Role',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header
                title='Create New Role'
                description='This action allows you to define a new role. Enter the name of the role and submit the form.'
            />

            <div className='max-w-xl'>
                {formDataStatus !== 'success' ? <FormSkeleton /> : <RoleCreateForm formData={formData!} />}
            </div>
        </SecondShell>
    );
};

RoleCreatePage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Create Role'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default RoleCreatePage;
