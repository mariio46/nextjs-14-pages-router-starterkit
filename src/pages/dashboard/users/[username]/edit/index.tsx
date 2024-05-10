import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { EditUserForm } from '@/components/pages/dashboard/users/edit-form';
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
import Link from 'next/link';
import { useRouter } from 'next/router';

type UserEditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

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

const UserEditPage: NextPageWithLayout<UserEditPageProps> = () => {
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
                            <Link href='/users'>Users</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/users/${query.username}`}>{title}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <HeaderPrimary className='my-5 space-y-0.5'>
                <HeaderPrimaryTitle className='text-base'>Edit User</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>Detail user that contain their information.</HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='edit-user-form'>
                {!isLoading && !isError && (
                    <div className='max-w-xl'>
                        <EditUserForm user={data?.data.user!} />
                    </div>
                )}
            </section>
        </>
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
