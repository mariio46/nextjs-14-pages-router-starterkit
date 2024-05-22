import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleUser } from '@/lib/api/data/users/fetch-users';

import { FormSkeleton } from '@/components/form-skeleton';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { UserEditForm } from '@/components/pages/dashboard/users/user-edit-form';

type UserEditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission(['management admin', 'management member'], { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { username: query.username as string } };
}) satisfies GetServerSideProps<{ username: string }>;

const UserEditPage: NextPageWithLayout<UserEditPageProps> = ({ username }) => {
    const { user, status } = useFetchSingleUser(username);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/users',
            title: 'Users',
        },
        {
            as: 'link',
            link: `/users/${username}`,
            title: 'Detail User',
        },
        {
            as: 'page',
            title: 'Edit User',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Edit User' description='Detail user that contain their information.' />

            <section id='edit-user-form' className='max-w-xl'>
                {status !== 'success' ? <FormSkeleton inputLength={3} /> : <UserEditForm user={user!} />}
            </section>
        </SecondShell>
    );
};

UserEditPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Edit User'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default UserEditPage;
