import Head from 'next/head';
import { type ReactNode } from 'react';
import { ThemeToggle } from '../theme-toggle';

export const GuestLayout = ({ children, title }: { children: ReactNode; title: string }) => {
    return (
        <div className='min-h-screen flex items-center justify-center font-sans relative'>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <div className='max-w-xl min-w-[36rem]'>{children}</div>
            <div className='absolute bottom-2 right-2'>
                <ThemeToggle />
            </div>
        </div>
    );
};
