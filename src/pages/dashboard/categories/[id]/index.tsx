import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { CategoryDetailAction } from '@/components/pages/dashboard/categories/detail/category-detail-action';
import { CategoryDetailBlocks } from '@/components/pages/dashboard/categories/detail/category-detail-blocks';
import { useFetchSingleCategory } from '@/lib/api/data/categories/fetch-categories';

type CategoryDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management categories', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const CategoryDetailPage: NextPageWithLayout<CategoryDetailPageProps> = ({ id: categoryId }) => {
    const { category, status } = useFetchSingleCategory(categoryId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/categories',
            title: 'Category',
        },
        {
            as: 'page',
            title: 'Detail category',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer>
                <SecondShell.Header
                    title='Detail Category'
                    description='Detail category that contain their information.'
                    className='my-0'
                />
                <CategoryDetailAction category={category!} />
            </SecondShell.HeaderContainer>

            <section id='detail-category'>
                <CategoryDetailBlocks status={status} category={category!} />
            </section>
        </SecondShell>
    );
};

CategoryDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail Category'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default CategoryDetailPage;
