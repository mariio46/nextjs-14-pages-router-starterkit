import { AuthUser } from '@/components/auth-user';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { NextPageWithLayout } from '@/pages/_app';

const Profile: NextPageWithLayout = () => {
    return (
        <div className='flex items-center justify-center'>
            <AuthUser />
        </div>
    );
};

Profile.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Profile'>{page}</AppLayout>
        </RootLayout>
    );
};

export default Profile;
