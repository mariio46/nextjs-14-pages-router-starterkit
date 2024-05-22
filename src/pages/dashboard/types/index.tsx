import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';

import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { FirstShell } from '@/components/layouts/shells/first-shell';
import { TypeCreateDialog } from '@/components/pages/dashboard/types/type-create-dialog';
import { typesColumn } from '@/components/pages/dashboard/types/types-column';
import { DataTable } from '@/components/tanstack/data-table';
import { Button } from '@/components/ui/button';
import { useFetchAllTypes } from '@/lib/api/data/types/fetch-types';

type TypesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management types', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return { props: {} };
}) satisfies GetServerSideProps;

const TypesPage: NextPageWithLayout<TypesPageProps> = () => {
    const { types, status } = useFetchAllTypes();

    return (
        <FirstShell>
            <FirstShell.HeaderContainer>
                <FirstShell.Header
                    title='Types'
                    description='The table below is a list of all type for your products in your app.'
                />

                <TypeCreateDialog>
                    <Button>
                        <Icon name='IconCirclePlus' className='me-1' />
                        Create Type
                    </Button>
                </TypeCreateDialog>
            </FirstShell.HeaderContainer>

            <section id='types-table' className='my-5'>
                <DataTable status={status} data={types!} columns={typesColumn} filterKey='name' />
            </section>
        </FirstShell>
    );
};

TypesPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Types'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default TypesPage;
