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
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import Link from 'next/link';

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
                                    <DialogContent>
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
            <AuthStateProvider>
                <AuthLayout title='Danger Area'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default DangerArea;
