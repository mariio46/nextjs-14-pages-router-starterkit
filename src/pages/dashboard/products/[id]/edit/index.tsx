import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { FormSkeleton } from '@/components/form-skeleton';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { ProductEditForm } from '@/components/pages/dashboard/products/product-edit-form';
import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useCategoriesFormData } from '@/lib/api/data/categories/fetch-categories';
import { useFetchSingleProduct } from '@/lib/api/data/products/fetch-products';
import { useTypesFormData } from '@/lib/api/data/types/fetch-types';

type ProductEditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management products', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const ProductEditPage: NextPageWithLayout<ProductEditPageProps> = ({ id: productId }) => {
    const { product, status } = useFetchSingleProduct(productId);
    const { formData: categoriesFormData } = useCategoriesFormData();
    const { formData: typesFormData } = useTypesFormData();

    const breadcrumbData = [
        {
            as: 'link',
            link: '/products',
            title: 'Products',
        },
        {
            as: 'link',
            link: `/products/${productId}`,
            title: 'Detail Product',
        },
        {
            as: 'page',
            title: 'Edit Product',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Edit Product' description='This action will be update the product you choose.' />

            <section id='edit-product-form' className='max-w-xl'>
                {product && typesFormData && categoriesFormData ? (
                    <ProductEditForm categories={categoriesFormData} types={typesFormData} product={product} />
                ) : (
                    <FormSkeleton inputLength={5} />
                )}
            </section>
        </SecondShell>
    );
};

ProductEditPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Edit Product'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default ProductEditPage;
