import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { Link } from '@/components/link';
import { ProductDetailBlocks } from '@/components/pages/dashboard/products/detail/product-detail-blocks';
import { ProductDetailSkeleton } from '@/components/pages/dashboard/products/detail/product-detail-skeleton';
import { useFetchSingleProduct } from '@/lib/api/data/products/fetch-products';

type ProductDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management products', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const ProductDetailPage: NextPageWithLayout<ProductDetailPageProps> = ({ id: productId }) => {
    const { product, status } = useFetchSingleProduct(productId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/products',
            title: 'Products',
        },
        {
            as: 'page',
            title: 'Detail product',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer>
                <SecondShell.Header
                    title='Detail Product'
                    description='Detail product that contain their information.'
                    className='my-0'
                />
                <Link href={`/products/${productId}/edit`}>
                    <Icon className='me-1' name='IconEdit' />
                    Edit
                </Link>
            </SecondShell.HeaderContainer>

            <section id='detail-product'>
                {status !== 'success' || !product ? (
                    <ProductDetailSkeleton />
                ) : (
                    <ProductDetailBlocks product={product} />
                )}
            </section>
        </SecondShell>
    );
};

ProductDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail Product'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default ProductDetailPage;
