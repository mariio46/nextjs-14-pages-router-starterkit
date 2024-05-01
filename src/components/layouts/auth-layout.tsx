import Head from 'next/head';
import { type ReactElement } from 'react';
import { Navigation } from '../navigation';

export const AuthLayout = ({ children, title }: { children: ReactElement; title: string }) => {
    return (
        <>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <div>
                <Navigation />
                <main className='p-10'>{children}</main>
            </div>
        </>
    );
};
