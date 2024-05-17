import NextLink from 'next/link';

import { useAuthUserState } from '@/services/store/auth-user-state';
import { ThemeToggle } from './theme-toggle';

import { ApplicationLogo } from './application-logo';
import { Link } from './link';
import { NavigationDropdown } from './navigation-dropdown';
import { NavigationLink } from './navigation-link';
import { Separator } from './ui/separator';

export const Navigation = () => {
    const check = useAuthUserState((state) => state.check);

    return (
        <header className='relative z-[60] hidden lg:block'>
            <nav className='fixed left-1/2 top-0 w-full -translate-x-1/2 py-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='mx-auto flex h-9 max-w-screen-2xl items-center justify-between px-4 sm:px-6'>
                    <NextLink href='/'>
                        <ApplicationLogo className='h-8 w-auto' />
                    </NextLink>
                    <div className='flex'>
                        <div className='flex items-center gap-1.5'>
                            <NavigationLink href='/' variant='ghost'>
                                Home
                            </NavigationLink>
                        </div>
                        <Separator orientation='vertical' className='shrink-0 bg-border w-[1.1px] mx-4 h-9' />
                        <div className='flex items-center gap-4'>
                            <ThemeToggle />
                            {check ? (
                                <NavigationDropdown />
                            ) : (
                                <>
                                    <Link href='/login' variant='outline'>
                                        Login
                                    </Link>
                                    <Link href='/register' variant='outline'>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
