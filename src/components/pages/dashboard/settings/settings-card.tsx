import { Icon } from '@/components/icon';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import Link from 'next/link';

export const SettingsCards: React.FC = () => {
    const user = useAuthUserState((state) => {
        return {
            last_updated_account: state.user?.last_updated_account,
            last_updated_password: state.user?.last_updated_password,
        };
    });

    return (
        <div className='grid gap-4 md:gap-8 xl:grid-cols-3'>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Account Information</CardTitle>
                    <Icon name='IconUserCircle' className='stroke-2 text-muted-foreground' />
                </CardHeader>
                <CardContent className='h-[90px] flex flex-col'>
                    <p className='mb-4 flex-1 text-sm text-muted-foreground line-clamp-2'>
                        {user.last_updated_account}
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
                    <Link href='/settings/danger' className={cn(buttonVariants({ variant: 'destructive' }), 'w-full')}>
                        Delete Account
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};
