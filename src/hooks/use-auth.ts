import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useLoading } from './use-loading';

export const useAuth = () => {
    const { loading, startLoading, stopLoading } = useLoading();
    const { clear: clearAuth } = useAuthState();
    const router = useRouter();

    const data = {};
    // prettier-ignore-start
    // const headers = { headers: { Authorization: `Bearer ${getCookie(TOKEN_COOKIE_KEY)}` } };
    // prettier-ignore-end

    const clearCookieAndAuth = (): void => {
        deleteCookie(TOKEN_COOKIE_KEY);
        clearAuth();
    };

    const logout = async () => {
        startLoading();
        try {
            const response = await axios.post('/logout', data, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY));
            // console.log(response);
            clearCookieAndAuth();
            if (router.pathname !== '/') router.push('/login');
            router.reload();
        } catch (error: any) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                console.error(error);
                clearCookieAndAuth();
                router.push('/login');
            } else if (error instanceof AxiosError && error.response?.status !== 401) {
                console.error(error);
                clearCookieAndAuth();
                router.push('/login');
            } else {
                console.error(error);
            }
        } finally {
            stopLoading();
        }
    };

    return { loading, logout };
};
