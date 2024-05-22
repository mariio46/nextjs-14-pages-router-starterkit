import '@/styles/globals.css';
import { type ReactElement, type ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Figtree } from 'next/font/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { useAuth } from '@/lib/api/data/auth/use-auth';

const figtree = Figtree({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 5 minute * 60 seconds * 1000 milliseconds = 5 minutes
            staleTime: 5 * 60 * 1000,
            gcTime: 5 * 60 * 1000,
        },
    },
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { isLoading, isServerDown, serverDownStatus, serverDownMessage } = useAuth();

    if (isLoading) return <Loading />;
    if (isServerDown) return <Error code={serverDownStatus!} message={serverDownMessage!} />;

    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <QueryClientProvider client={queryClient}>
            <div className={figtree.className}>
                <Component {...pageProps} />
            </div>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        </QueryClientProvider>,
    );
}
