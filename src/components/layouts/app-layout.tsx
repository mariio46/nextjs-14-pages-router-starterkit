import Head from 'next/head';
import type { ReactElement } from 'react';

export const AppLayout = ({ children, title }: { children: ReactElement; title: string }) => {
    return (
        <div className='min-h-screen flex items-center justify-center font-sans relative'>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            {children}
        </div>
    );
};
