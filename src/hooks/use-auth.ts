import { BE_LOGOUT } from '@/lib/api/end-point';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useLoading } from './use-loading';

export const useAuth = () => {
    const { loading, startLoading, stopLoading } = useLoading();

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const isValidating = useAuthUserState((state) => state.isValidating);

    const router = useRouter();

    const clearCookieAndAuth = (): void => {
        deleteCookie(TOKEN_COOKIE_KEY);
        setAuthCheck(false);
        isValidating(false);
        router.push(`/login?callback=${router.asPath.toString()}`);
    };

    const logout = async () => {
        startLoading();
        try {
            await axios.post(BE_LOGOUT, {}, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY));
            clearCookieAndAuth();
        } catch (error: any) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                clearCookieAndAuth();
            } else if (error instanceof AxiosError && error.response?.status !== 401) {
                clearCookieAndAuth();
            } else {
                console.error(error);
            }
        } finally {
            stopLoading();
        }
    };

    return { loading, logout };
};
