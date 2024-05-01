import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import Link from 'next/link';

const Settings: NextPageWithLayout = () => {
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
                        <CardContent>
                            <p className='mb-4 text-sm text-muted-foreground'>Last update account 2 minutes ago.</p>
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
                            <Icon name='IconUserCircle' className='stroke-2 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <p className='mb-4 text-sm text-muted-foreground'>Last update password 2 minutes ago.</p>
                        </CardContent>
                        <CardFooter>
                            <Link href='/' className={cn(buttonVariants(), 'w-full')}>
                                Update Password
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle>Danger Area</CardTitle>
                            <Icon name='IconUserCircle' className='stroke-2 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <p className='mb-4 text-sm text-muted-foreground'>
                                This will redirect you to delete account page.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href='/' className={cn(buttonVariants(), 'w-full')}>
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
