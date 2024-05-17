import Head from 'next/head';
import { type ReactElement } from 'react';
import { Navigation } from '../navigation';
import { ResponsiveNavigation } from '../responsive-navigation';

export const AppLayout = ({ children, title }: { children: ReactElement; title: string }) => {
    return (
        <>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <div>
                <Navigation />
                <ResponsiveNavigation />
                <div className='mt-20 ' />
                <main className='px-4 sm:px-6'>{children}</main>
            </div>
        </>
    );
};
