import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleUser } from '@/lib/api/data/users/fetch-users';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { Link } from '@/components/link';
import { UserDetailBlocks } from '@/components/pages/dashboard/users/detail/user-detail-blocks';
import { UserDetailSkeleton } from '@/components/pages/dashboard/users/detail/user-detail-skeleton';

type UserDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management users', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { username: query.username as string } };
}) satisfies GetServerSideProps<{ username: string }>;

const UserDetailPage: NextPageWithLayout<UserDetailPageProps> = ({ username }) => {
    const { user, status } = useFetchSingleUser(username);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/users',
            title: 'Users',
        },
        {
            as: 'page',
            title: 'Detail User',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer className='my-5'>
                <SecondShell.Header
                    className='my-0'
                    title='Detail User'
                    description='Detail user that contain their information.'
                />

                <Link href={`/users/${username}/edit`}>
                    <Icon name='IconEdit' className='me-1' />
                    Edit User
                </Link>
            </SecondShell.HeaderContainer>

            <section id='detail-user'>
                {status !== 'success' ? <UserDetailSkeleton /> : <UserDetailBlocks user={user!} />}
            </section>
        </SecondShell>
    );
};

UserDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail User'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default UserDetailPage;
