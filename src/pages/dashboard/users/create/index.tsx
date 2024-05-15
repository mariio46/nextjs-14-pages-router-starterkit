import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { CreateUserForm } from '@/components/pages/dashboard/users/create-form';

type UserCreatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management users', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const UserCreatePage: NextPageWithLayout<UserCreatePageProps> = () => {
    const breadcrumbData = [
        {
            as: 'link',
            link: '/users',
            title: 'Users',
        },
        {
            as: 'page',
            title: 'Create User',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Create New User' description='Fill all the field below to add one user.' />

            <section id='create-user-form' className='max-w-xl'>
                <CreateUserForm />
            </section>
        </SecondShell>
    );
};

UserCreatePage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Create User'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default UserCreatePage;
