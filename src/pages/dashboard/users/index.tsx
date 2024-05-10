import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { AuthShellPrimary } from '@/components/layouts/shells/auth-shell-primary';
import { userColumns } from '@/components/pages/dashboard/users/column';
import { DataTable } from '@/components/pages/dashboard/users/data-table';
import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchAllUsers } from '@/lib/api/data/users/fetch-users';
import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

type UsersPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management users', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return {
        props: {},
    };
}) satisfies GetServerSideProps;

const Users: NextPageWithLayout<UsersPageProps> = () => {
    const { data, isLoading, isError, error } = useFetchAllUsers();

    if (isError) console.error(error);

    return (
        <AuthShellPrimary
            title='Users'
            description='list of all users, you can create, update, and delete user you choose.'>
            <section id='users-table' className='my-10'>
                <DataTable isLoading={isLoading} isError={isError} data={data!} columns={userColumns} />
            </section>
        </AuthShellPrimary>
    );
};

Users.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='TanStack Users Table'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Users;
