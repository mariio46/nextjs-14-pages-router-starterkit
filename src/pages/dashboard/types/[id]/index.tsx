import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SecondShell } from '@/components/layouts/shells/second-shell';
import { ShellBreadcrumb, type BreadcrumbDataType } from '@/components/layouts/shells/shell-breadcrumb';
import { TypeDetailBlocks } from '@/components/pages/dashboard/types/detail/type-detail-blocks';
import { useFetchSingleType } from '@/lib/api/data/types/fetch-types';

type TypeDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management types', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: { id: query.id as string } };
}) satisfies GetServerSideProps<{ id: string }>;

const TypeDetailPage: NextPageWithLayout<TypeDetailPageProps> = ({ id: typeId }) => {
    const { type, status } = useFetchSingleType(typeId);

    const breadcrumbData = [
        {
            as: 'link',
            link: '/types',
            title: 'Type',
        },
        {
            as: 'page',
            title: 'Detail type',
        },
    ] satisfies BreadcrumbDataType[];

    return (
        <SecondShell>
            <ShellBreadcrumb data={breadcrumbData} />
            <SecondShell.HeaderContainer>
                <SecondShell.Header
                    title='Detail Type'
                    description='Detail type that contain their information.'
                    className='my-0'
                />
                {/* <TypeDetailAction type={type!} /> */}
            </SecondShell.HeaderContainer>

            <section id='detail-type'>
                <TypeDetailBlocks type={type!} status={status} />
            </section>
        </SecondShell>
    );
};

TypeDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Detail Type'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default TypeDetailPage;
