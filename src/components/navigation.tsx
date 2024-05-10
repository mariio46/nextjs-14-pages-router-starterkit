import { cn } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import Link from 'next/link';
import { ApplicationLogo } from './application-logo';
import { NavigationDropdown } from './navigation-dropdown';
import { NavigationLink } from './navigation-link';
import { ThemeToggle } from './theme-toggle';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

export const Navigation = () => {
    const check = useAuthUserState((state) => state.check);

    return (
        <header className='relative z-[60] hidden lg:block'>
            <nav className='fixed left-1/2 top-0 w-full -translate-x-1/2 bg-background py-4'>
                <div className='mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6'>
                    <Link href='/'>
                        <ApplicationLogo className='h-8 w-auto' />
                    </Link>
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
                                    <Link href='/login' className={cn(buttonVariants({ variant: 'outline' }))}>
                                        Login
                                    </Link>
                                    <Link href='/register' className={cn(buttonVariants({ variant: 'outline' }))}>
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

// const previousNav = () => {
//     return (
//         <nav className='bg-background border-b'>
//         <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
//             <div className='flex h-16 items-center justify-between'>
//                 <div className='flex items-center'>
//                     <Link href='/' className='flex-shrink-0'>
//                         <ApplicationLogo className='h-8 w-auto' />
//                     </Link>
//                     <div className='hidden sm:ml-6 sm:block'>
//                         <div className='flex space-x-4'>
//                             <NavigationLink href='/'>Home</NavigationLink>
//                             {check && (
//                                 <>
//                                     <NavigationLink href='/client-side'>CSR</NavigationLink>
//                                     <NavigationLink href='/server-side'>SSR</NavigationLink>
//                                     <NavigationLink href='/static-site-generation'>SSG</NavigationLink>
//                                     <NavigationLink href='/api-render'>API</NavigationLink>
//                                     <NavigationLink href='/profile'>Profile</NavigationLink>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex items-center gap-3 '>
//                     <ThemeToggle />
//                     <Separator orientation='vertical' className='h-9 w-px' />
//                     {check ? (
//                         <NavigationDropdown user={user} />
//                     ) : (
//                         <>
//                             <Link href='/login' className={cn(buttonVariants({ variant: 'outline' }))}>
//                                 Login
//                             </Link>
//                             <Link href='/register' className={cn(buttonVariants({ variant: 'outline' }))}>
//                                 Register
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </nav>
//     );
// }
