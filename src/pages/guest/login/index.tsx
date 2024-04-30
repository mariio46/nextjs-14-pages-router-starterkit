import { GuestLayout } from '@/components/layouts/guest-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { LoginForm } from '@/components/pages/login/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NextPageWithLayout } from '@/pages/_app';

const Login: NextPageWithLayout = () => {
    return (
        <Card className='border-none shadow-none'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, beatae.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    );
};

Login.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            <GuestLayout title='Login'>{page}</GuestLayout>
        </RootLayout>
    );
};

export default Login;
