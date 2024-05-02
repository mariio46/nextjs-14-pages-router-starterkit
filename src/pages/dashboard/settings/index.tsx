import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import useAuthState from '@/services/store/auth-state';
import Link from 'next/link';

const Settings: NextPageWithLayout = () => {
    const user = useAuthState((state) => state.user);
    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>Settings</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>
                    Manage your account by using the correct account and updating your password regularly.
                </HeaderPrimaryDescription>
            </HeaderPrimary>
            <section id='settings-card' className='mt-5'>
                <div className='grid gap-4 md:gap-8 xl:grid-cols-3'>
                    <Card>
                        <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle>Account Information</CardTitle>
                            <Icon name='IconUserCircle' className='stroke-2 text-muted-foreground' />
                        </CardHeader>
                        <CardContent className='h-[90px] flex flex-col'>
                            <p className='mb-4 flex-1 text-sm text-muted-foreground line-clamp-2'>
                                {user?.last_updated_account}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href='/settings/account' className={cn(buttonVariants(), 'w-full')}>
                                Update Account
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle>Security</CardTitle>
                            <Icon name='IconShield' className='stroke-2 text-muted-foreground' />
                        </CardHeader>
                        <CardContent className='h-[90px] flex flex-col'>
                            <p className='mb-4 flex-1 text-sm text-muted-foreground line-clamp-2'>
                                {/* Becarefull, you will be logout after updating password. */}
                                {user?.last_updated_password}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href='/settings/security' className={cn(buttonVariants(), 'w-full')}>
                                Update Password
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle>Danger Area</CardTitle>
                            <Icon name='IconAlertTriangle' className='stroke-2 text-destructive' />
                        </CardHeader>
                        <CardContent className='h-[90px] flex flex-col'>
                            <p className='mb-4 text-sm flex-1 text-muted-foreground line-clamp-2'>
                                Warning, this will redirect you to page where you can delete your account.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link
                                href='/settings/danger'
                                className={cn(buttonVariants({ variant: 'destructive' }), 'w-full')}>
                                Delete Account
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </>
    );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthStateProvider>
                <AuthLayout title='Settings'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Settings;
