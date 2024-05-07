import { Loading } from '@/components/loading';
import { useAuthUserData } from '@/hooks/use-auth-user-data';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 5 minute * 60 seconds * 1000 milliseconds
            staleTime: 5 * 60 * 1000,
        },
    },
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { validating } = useAuthUserData();

    if (!validating) return <Loading />;

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
