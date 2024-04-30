import { useLoading } from '@/hooks/use-loading';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import { ThemeProvider } from '@/services/providers/theme-provider';
import useAuthState from '@/services/store/auth-state';
import { AuthUserType } from '@/types/user';
import { AxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import NextTopLoader from 'nextjs-toploader';
import { useEffect } from 'react';
import { Loading } from '../loading';
import { Toaster } from '../ui/toaster';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { loading, setLoading } = useLoading(false);
    const auth = useAuthState();

    const getAuthUser = async () => {
        try {
            const { data } = await axios.get('/user', getAxiosHeadersWithToken(TOKEN_COOKIE_KEY));
            const { user }: AuthUserType = data.data;
            auth.setUser(user, true);
        } catch (error: any) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                if (hasCookie(TOKEN_COOKIE_KEY)) {
                    deleteCookie(TOKEN_COOKIE_KEY);
                    auth.clear();
                }
                if (process.env.NODE_ENV === 'production') console.clear();
            } else {
                console.error(error);
                if (process.env.NODE_ENV === 'production') console.clear();
            }
        }

        setLoading(true);
    };

    useEffect(() => {
        // if (hasCookie(TOKEN_COOKIE_KEY)) {
        getAuthUser();
        // }
    }, [auth.check, loading]);

    if (!loading)
        return (
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                <Loading />
            </ThemeProvider>
        );

    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextTopLoader color='#3b82f6' showSpinner={false} />
            {children}
            <Toaster />
        </ThemeProvider>
    );
};
