import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { DeleteAccountForm } from '@/components/pages/dashboard/settings/danger/form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { RedirectIfUnauthencated, authUserTokenValidation } from '@/lib/api/data/auth/redirect-if-unauthenticated';
import { type NextPageWithLayout } from '@/pages/_app';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';

export const getServerSideProps = (async ({ req, res }) => {
    const token_status = await authUserTokenValidation(req, res);

    if (!token_status.authenticated) {
        return RedirectIfUnauthencated;
    }

    return { props: {} };
}) satisfies GetServerSideProps;

const DangerArea: NextPageWithLayout = () => {
    const { openDialog, toggleDialog } = useToggleDialog();
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href='/settings'>Settings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Danger Area</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <HeaderPrimary className='my-5 space-y-0.5'>
                <HeaderPrimaryTitle className='text-base'>Danger Area</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>This page is intended to delete your account.</HeaderPrimaryDescription>
            </HeaderPrimary>

            <section id='update-account-form'>
                <div className='mx-auto max-w-7xl'>
                    <div className='max-w-xl'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Delete Your Account?</CardTitle>
                                <CardDescription>
                                    Once your account is deleted, all of its resources and data will be permanently
                                    deleted. Before deleting your account, please download any data or information that
                                    you wish to retain.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant='destructive' onClick={toggleDialog}>
                                    Delete Account
                                </Button>
                                <Dialog open={openDialog} onOpenChange={toggleDialog}>
                                    <DialogContent className='max-w-xl'>
                                        <DialogHeader>
                                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                                            <DialogDescription>
                                                Once your account is deleted, all of its resources and data will be
                                                permanently deleted. Please enter your password to confirm you would
                                                like to permanently delete your account.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DeleteAccountForm closeDialog={toggleDialog} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

DangerArea.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthLayout title='Danger Area'>{page}</AuthLayout>
        </RootLayout>
    );
};

export default DangerArea;
