import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Figtree } from 'next/font/google';
import { type ReactElement, type ReactNode } from 'react';

const figtree = Figtree({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <div className={figtree.className}>
            <Component {...pageProps} />
        </div>,
    );
}
