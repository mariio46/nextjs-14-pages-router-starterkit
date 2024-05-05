import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { userColumns } from '@/components/pages/dashboard/users/column';
import { DataTable } from '@/components/pages/dashboard/users/data-table';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getServerSideCookieToken } from '@/lib/utilities/axios-utils';
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import { User } from '@/types/api/feature/users';
import { AxiosError, AxiosResponse } from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type TanStackUserTablePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const TanStackUserTable: NextPageWithLayout<TanStackUserTablePageProps> = ({ data }) => {
    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>TanStack Users Table</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    list of all users, you can create, update, and delete user you choose.
                </HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='users-table' className='my-10'>
                <DataTable data={data} columns={userColumns} />
            </section>
        </>
    );
};

TanStackUserTable.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthStateProvider>
                <AuthLayout title='TanStack Users Table'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default TanStackUserTable;

export const getServerSideProps = (async ({ req, res }) => {
    // prettier-ignore
    const data = await axios
        .get('/users', getServerSideCookieToken(TOKEN_COOKIE_KEY, { req, res }))
        .then((res: AxiosResponse<User[]>) => res.data)
        .catch((e: AxiosError) => {
            throw new Error(`${e.response?.status} ${e.response?.statusText}`);
        });

    return {
        props: { data },
    };
}) satisfies GetServerSideProps<{ data: User[] }>;
