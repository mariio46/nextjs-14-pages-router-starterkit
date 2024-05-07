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
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';

const Create: NextPageWithLayout = () => {
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

Create.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Create User'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default Create;
