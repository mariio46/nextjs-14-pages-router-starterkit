import Head from 'next/head';
import { type ReactElement } from 'react';
import { Navigation } from '../navigation';
import { SideNavigation } from '../side-navigation';

export const AuthLayout = ({ children, title }: { children: ReactElement; title?: string }) => {
    return (
        <>
            {title && (
                <Head>
                    <title>{`${title} / NextJS-14`}</title>
                </Head>
            )}
            <div>
                <Navigation />
                <div className='mt-20' />
                <div className='flex'>
                    <SideNavigation />
                    <main className='w-full p-4 lg:w-4/5 '>{children}</main>
                </div>
            </div>
        </>
    );
};
