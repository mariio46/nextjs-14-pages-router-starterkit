import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { useFetchAllCategories } from '@/lib/api/data/categories/fetch-categories';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { categoriesColumn } from '@/components/pages/dashboard/categories/categories-column';
import { CategoryCreateDialog } from '@/components/pages/dashboard/categories/category-create-dialog';
import { DataTable } from '@/components/tanstack/data-table';
import { Button } from '@/components/ui/button';

type CategoriesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management categories', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const CategoriesPage: NextPageWithLayout<CategoriesPageProps> = () => {
    const { categories, status } = useFetchAllCategories();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Categories'
                    description='The table below is a list of all category for your products in your app.'
                />
                <CategoryCreateDialog>
                    <Button>
                        <Icon name='IconCirclePlus' className='me-1' />
                        Create Category
                    </Button>
                </CategoryCreateDialog>
            </FirstShell.HeaderContainer>

            <section id='categories-table' className='my-5'>
                <DataTable status={status} data={categories!} columns={categoriesColumn} filterKey='name' />
            </section>
        </FirstShell>
    );
};

CategoriesPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Categories'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default CategoriesPage;
