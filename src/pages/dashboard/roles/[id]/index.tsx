import type { NextPageWithLayout } from '@/pages/_app';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { RedirectIfUnauthorized, useCheckPermission } from '@/lib/api/data/auth/check-permission';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { useFetchSingleRole } from '@/lib/api/data/roles/fetch-roles';
import { useRoleShellSecondaryData } from '@/lib/utilities/shell-secondary-data';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { AuthShellSecondary } from '@/components/layouts/shells/auth-shell-secondary';
import { RoleDetailAction } from '@/components/pages/dashboard/roles/detail/role-detail-action';
import { RoleDetailBlocks } from '@/components/pages/dashboard/roles/detail/role-detail-blocks';

type RoleDetailPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async ({ req, res, query }) => {
    const token_status = await authUserTokenValidation(req, res);
    const permission_status = await useCheckPermission('management role permission', { req, res });

    if (!token_status.authenticated) return RedirectIfUnauthencated;
    if (!permission_status.authorized) return RedirectIfUnauthorized;

    return {
        props: {
            id: query.id,
        },
    };
}) satisfies GetServerSideProps<{ id: string | string[] | undefined }>;

const RoleDetailPage: NextPageWithLayout<RoleDetailPageProps> = ({ id: roleId }) => {
    const { role, isLoading, isError } = useFetchSingleRole(roleId as string);

    const roleShellSecondaryData = useRoleShellSecondaryData(role);

    return (
        <AuthShellSecondary {...{ ...roleShellSecondaryData }} Action={() => <RoleDetailAction role={role!} />}>
            <section id='detail-role'>
                <RoleDetailBlocks role={role!} isLoading={isLoading} isError={isError} />
            </section>
        </AuthShellSecondary>
    );
};

RoleDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout>{page}</AuthLayout>
        </RootLayout>
    );
};

export default RoleDetailPage;
