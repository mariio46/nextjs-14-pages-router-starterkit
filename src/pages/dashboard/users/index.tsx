import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchAllUsers } from '@/lib/api/data/users/fetch-users';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { Link } from '@/components/link';
import { usersColumns } from '@/components/pages/dashboard/users/users-column';
import { DataTable } from '@/components/tanstack/data-table';

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
    const { users, status } = useFetchAllUsers();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Users'
                    description='list of all users, you can create, update, and delete user you choose.'
                />
                <Link href='/users/create'>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Create User
                </Link>
            </FirstShell.HeaderContainer>

            <section id='users-table' className='my-5'>
                <DataTable data={users!} columns={usersColumns} status={status} filterKey='name' />
            </section>
        </FirstShell>
    );
};

Users.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Users'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Users;
