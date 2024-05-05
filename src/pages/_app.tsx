import { Loading } from '@/components/loading';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { useAuthUserState } from '@/services/store/auth-user-state';
import '@/styles/globals.css';
import { AuthUserType } from '@/types/user';
import { AxiosResponse, isAxiosError } from 'axios';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Figtree } from 'next/font/google';
import { useEffect, type ReactElement, type ReactNode } from 'react';

const figtree = Figtree({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const setAuthUser = useAuthUserState((state) => state.setUser);

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const authCheck = useAuthUserState((state) => state.check);

    const validating = useAuthUserState((state) => state.validating);
    const isValidating = useAuthUserState((state) => state.isValidating);

    const headers = {
        headers: {
            Authorization: `Bearer ${getCookie(TOKEN_COOKIE_KEY)}`,
        },
    };

    useEffect(() => {
        const getAuthUserData = async () => {
            try {
                const response: AxiosResponse<{ data: AuthUserType }> = await axios.get('/user', headers);

                setAuthUser(response.data.data.user);

                setAuthCheck(true);
            } catch (e: any) {
                if (isAxiosError(e)) {
                    if (e.response?.status === 401) {
                        setAuthUser(undefined);
                        setAuthCheck(false);
                        if (hasCookie(TOKEN_COOKIE_KEY)) deleteCookie(TOKEN_COOKIE_KEY);
                    } else {
                        console.error(e);
                    }
                } else {
                    console.error(e);
                }
            }
            setTimeout(() => isValidating(true), 2500);
        };

        getAuthUserData();
    }, [authCheck, validating]);

    if (!validating) return <Loading />;

    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <div className={figtree.className}>
            <Component {...pageProps} />
        </div>,
    );
}
