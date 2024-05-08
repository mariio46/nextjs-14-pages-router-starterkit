import { useLoading } from '@/hooks/use-loading';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { BE_LOGOUT } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

export const useLogout = () => {
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
            await axios.post(BE_LOGOUT, {}, getClientSideAxiosHeaders());
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
