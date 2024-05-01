import Head from 'next/head';
import { type ReactElement } from 'react';
import { Navigation } from '../navigation';

export const AppLayout = ({ children, title }: { children: ReactElement; title: string }) => {
    return (
        <>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <div>
                <Navigation />
                <div className='mt-20' />
                <div className='border-b'>
                    <div className='h-60 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <h3 className='text-xl font-semibold'>{title} / Page</h3>
                    </div>
                </div>
                <main className='p-10'>{children}</main>
            </div>
        </>
    );
};
