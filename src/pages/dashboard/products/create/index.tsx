import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { FormSkeleton } from '@/components/form-skeleton';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { ProductCreateForm } from '@/components/pages/dashboard/products/product-create-form';
import { useCategoriesFormData } from '@/lib/api/data/categories/fetch-categories';
import { useTypesFormData } from '@/lib/api/data/types/fetch-types';

type ProductCreatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management products', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const ProductCreatePage: NextPageWithLayout<ProductCreatePageProps> = () => {
    const { formData: categoriesFormData, status: categoriesFormDataStatus } = useCategoriesFormData();
    const { formData: typesFormData, status: typesFormDataStatus } = useTypesFormData();

    const breadcrumbData = [
        {
            as: 'link',
            link: '/products',
            title: 'Products',
        },
        {
            as: 'page',
            title: 'Create Product',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.Header title='Create New Product' description='Fill all the field below to add one product.' />

            <section id='create-user-form' className='max-w-xl'>
                {categoriesFormData && typesFormData ? (
                    <ProductCreateForm categories={categoriesFormData} types={typesFormData} />
                ) : (
                    <FormSkeleton inputLength={5} />
                )}
            </section>
        </SecondShell>
    );
};

ProductCreatePage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Create Product'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default ProductCreatePage;
