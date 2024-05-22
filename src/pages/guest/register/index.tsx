import { type NextPageWithLayout } from '@/pages/_app';

import { GuestLayout } from '@/components/layouts/guest-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { RegisterForm } from '@/components/pages/register/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register: NextPageWithLayout = () => {
    return (
        <Card className='border-none shadow-none'>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Enter your personal data and join with us.</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <GuestLayout title='Register'>{page}</GuestLayout>
        </RootLayout>
    );
};

export default Register;
