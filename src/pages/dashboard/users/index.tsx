import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { userColumns } from '@/components/pages/dashboard/users/column';
import { DataTable } from '@/components/pages/dashboard/users/data-table';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { getAllUsers } from '@/lib/api/data/users';
import { type NextPageWithLayout } from '@/pages/_app';
import { User } from '@/types/api/feature/users';
import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

type UsersPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Users: NextPageWithLayout<UsersPageProps> = () => {
    const { data, isLoading, isError, error, isFetching } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });

    if (isError) console.error(error);

    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>TanStack Users Table</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    list of all users, you can create, update, and delete user you choose.
                </HeaderPrimaryDescription>
            </HeaderPrimary>

            {isFetching && <div>Refetching...</div>}

            <section id='users-table' className='my-10'>
                <DataTable isLoading={isLoading} isError={isError} data={data!} columns={userColumns} />
            </section>
        </>
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

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return {
        props: {},
    };
}) satisfies GetServerSideProps;
