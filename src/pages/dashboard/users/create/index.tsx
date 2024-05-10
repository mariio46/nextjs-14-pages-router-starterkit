import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { CreateUserForm } from '@/components/pages/dashboard/users/create-form';
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
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

type UserCreatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    const permission_status = await useCheckPermission('management users', { req, res });

    if (!permission_status.authorized) {
        return RedirectIfUnauthorized;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const UserCreatePage: NextPageWithLayout<UserCreatePageProps> = () => {
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
                        <BreadcrumbPage>Create User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <HeaderPrimary className='my-5 space-y-0.5'>
                <HeaderPrimaryTitle className='text-base'>Create User</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>Fill all the field below to add one user.</HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='create-user-form'>
                <div className='max-w-xl'>
                    <CreateUserForm />
                </div>
            </section>
        </>
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
