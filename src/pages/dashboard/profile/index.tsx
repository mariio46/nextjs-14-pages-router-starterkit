import { AuthUser } from '@/components/auth-user';
import { Icon } from '@/components/icon';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import Link from 'next/link';

const Profile: NextPageWithLayout = () => {
    const { loading, logout } = useAuth();
    return (
        <div className='flex flex-col items-center justify-center'>
            <AuthUser />
            <div className='mt-5 flex items-center gap-3'>
                <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
                    Home
                </Link>
                <Button type='button' variant='outline' disabled={loading} aria-label='logout' onClick={logout}>
                    {loading && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                    {!loading ? 'Logout' : 'Logout...'}
                </Button>
            </div>
        </div>
    );
};

Profile.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthStateProvider>
                <AuthLayout title='Profile'>{page}</AuthLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default Profile;
