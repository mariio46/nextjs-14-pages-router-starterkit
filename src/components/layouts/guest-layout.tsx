import Head from 'next/head';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { ApplicationLogo } from '../application-logo';
import { ThemeToggle } from '../theme-toggle';

export const GuestLayout = ({ children, title }: { children: ReactElement; title: string }) => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center font-sans relative'>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <Link className='mb-5' href='/'>
                <ApplicationLogo className='h-12 w-auto' />
            </Link>
            <div className='w-full sm:max-w-xl sm:min-w-[36rem]'>{children}</div>
            <div className='absolute bottom-2 right-2'>
                <ThemeToggle />
            </div>
        </div>
    );
};
