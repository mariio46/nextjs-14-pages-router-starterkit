import { type NextPageWithLayout } from '@/pages/_app';

import { GuestLayout } from '@/components/layouts/guest-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { LoginForm } from '@/components/pages/login/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login: NextPageWithLayout = () => {
    return (
        <Card className='border-none shadow-none'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credential to go to your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <GuestLayout title='Login'>{page}</GuestLayout>
        </RootLayout>
    );
};

export default Login;
