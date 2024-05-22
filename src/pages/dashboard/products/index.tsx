import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { Link } from '@/components/link';
import { productsColumn } from '@/components/pages/dashboard/products/products-column';
import { DataTable } from '@/components/tanstack/data-table';
import { useFetchAllProducts } from '@/lib/api/data/products/fetch-products';

type ProductsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management products', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const ProductsPage: NextPageWithLayout<ProductsPageProps> = () => {
    const { products, status } = useFetchAllProducts();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Products'
                    description='The table below is a list of all products in your app.'
                />
                <Link href='/products/create'>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Create Products
                </Link>
            </FirstShell.HeaderContainer>

            <section id='products-table' className='my-5'>
                <DataTable status={status} data={products!} columns={productsColumn} filterKey='name' />
            </section>
        </FirstShell>
    );
};

ProductsPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Products'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default ProductsPage;
