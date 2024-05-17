import { useAuthUserState } from '@/services/store/auth-user-state';
import NextLink from 'next/link';
import { ApplicationLogo } from '../application-logo';
import { Link } from '../link';
import { NavigationDropdown } from '../navigation-dropdown';
import { ThemeToggle } from '../theme-toggle';

interface ResponsiveNavigationProps {}

export const ResponsiveNavigation = ({}: ResponsiveNavigationProps) => {
    const authCheck = useAuthUserState((state) => state.check);

    return (
        <header className='relative z-[60] block lg:hidden'>
            <nav className='fixed left-1/2 top-0 w-full -translate-x-1/2 py-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='mx-auto flex h-6 max-w-screen-2xl items-center justify-between px-4 sm:px-6'>
                    <NextLink href='/'>
                        <ApplicationLogo className='h-8 w-auto' />
                    </NextLink>
                    <div className='flex gap-1.5'>
                        <ThemeToggle />
                        {authCheck ? (
                            <NavigationDropdown />
                        ) : (
                            <Link href='/login' className='font-semibold h-8'>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};
