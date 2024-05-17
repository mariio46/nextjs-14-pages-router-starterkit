import { AxiosError, isAxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import { useLoading } from '@/hooks/use-loading';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { BE_LOGOUT } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

export const useLogout = () => {
    const { loading, startLoading, stopLoading } = useLoading();

    const setAuthCheck = useAuthUserState((state) => state.setCheck);

    const router = useRouter();
    const { mutate } = useSWRConfig();

    const clearCookieAndAuth = (): void => {
        deleteCookie(TOKEN_COOKIE_KEY);
        setAuthCheck(false);
        mutate('/user', undefined);
        router.push(`/login?callback=${router.asPath.toString()}`);
    };

    const handleWhenLogoutIsFailed = (e: AxiosError): void => {
        isAxiosError(e) ? clearCookieAndAuth() : console.error(e);
    };

    // prettier-ignore
    const logout = async () => {
        startLoading();
        await axios.post(BE_LOGOUT, {}, getClientSideAxiosHeaders())
            .then(() => clearCookieAndAuth())
            .catch((e: AxiosError) => handleWhenLogoutIsFailed(e))
            .finally(() => stopLoading());
    };

    return { loading, logout };
};
