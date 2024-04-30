import { cn } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationDropdown } from './navigation-dropdown';
import { NavigationLink } from './navigation-link';
import { ThemeToggle } from './theme-toggle';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

// type NavigationProps = {
//     user: User | null;
//     check: boolean;
// };

export const Navigation = () => {
    const { user, check } = useAuthState();
    return (
        <nav className='bg-background border-b'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <Image
                                className='h-8 w-auto'
                                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                                alt='Your Company'
                                width={40}
                                height={32}
                            />
                        </div>
                        {/* {check && ( */}
                        <div className='hidden sm:ml-6 sm:block'>
                            <div className='flex space-x-4'>
                                <NavigationLink href='/'>Home</NavigationLink>
                                <NavigationLink href='/client-side'>CSR</NavigationLink>
                                <NavigationLink href='/server-side'>SSR</NavigationLink>
                                <NavigationLink href='/static-site-generation'>SSG</NavigationLink>
                                <NavigationLink href='/api-render'>API</NavigationLink>
                                <NavigationLink href='/profile'>Profile</NavigationLink>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                    <div className='flex items-center gap-3 '>
                        <ThemeToggle />
                        <Separator orientation='vertical' className='h-9 w-px' />
                        {check ? (
                            <NavigationDropdown user={user} />
                        ) : (
                            // <>
                            //     <Avatar>
                            //         <AvatarImage src={user?.avatar} />
                            //         <AvatarFallback>{acronym(user?.name!)}</AvatarFallback>
                            //     </Avatar>
                            //     <Button disabled={loading} onClick={logout}>
                            //         Logout
                            //     </Button>
                            // </>
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
    );
};
