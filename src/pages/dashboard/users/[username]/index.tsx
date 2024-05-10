import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { Link } from '@/components/link';
import { DetailUserBlocks } from '@/components/pages/dashboard/users/detail-user-blocks';
import { DetailUserSkeleton } from '@/components/pages/dashboard/users/detail-user-skeleton';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleUser } from '@/lib/api/data/users/fetch-users';
import { initialWord } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type UserDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    const permission_status = await useCheckPermission('management users', { req, res });

    if (!permission_status.authorized) {
        return RedirectIfUnauthorized;
    }

    return {
        props: {},
    };
}) satisfies GetServerSideProps;

const UserDetailPage: NextPageWithLayout<UserDetailPageProps> = () => {
    const { query } = useRouter();
    const username = query.username as string;

    const { data, isLoading, isError } = useFetchSingleUser(username as string);

    const title: string = data?.data.user ? `Detail ${initialWord(data?.data.user.name)}` : 'Detail User';

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <NextLink href='/users'>Users</NextLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex flex-wrap items-center justify-between'>
                <HeaderPrimary className='my-5 space-y-0.5'>
                    <HeaderPrimaryTitle className='text-base'>{title}</HeaderPrimaryTitle>
                    <HeaderPrimaryDescription>Detail user that contain their information.</HeaderPrimaryDescription>
                </HeaderPrimary>
                <Link href={`/users/${username}/edit`}>
                    <Icon name='IconEdit' className='me-1' />
                    Edit User
                </Link>
            </div>

            <section id='detail-user'>
                {isLoading || isError ? <DetailUserSkeleton /> : <DetailUserBlocks user={data?.data.user!} />}
            </section>
        </>
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
