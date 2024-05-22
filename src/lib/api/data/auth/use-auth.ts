import { type AxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import useSWR from 'swr';

import type { ApiResponse } from '@/types/api/response';
import type { AuthUserType } from '@/types/user';

import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { TOKEN_COOKIE_KEY } from '../../key';

type DataResponse = ApiResponse<AuthUserType>;

type ErrorResponse = AxiosError<{ message: string }>;

const authFetcher = (url: string) => axios.get(url, getClientSideAxiosHeaders()).then((res) => res.data);

export const useAuth = () => {
    const setAuthUser = useAuthUserState((state) => state.setUser);
    const setAuthCheck = useAuthUserState((state) => state.setCheck);

    // prettier-ignore
    const { isLoading, isValidating, error: errorResult } = useSWR<DataResponse, ErrorResponse>('/user', authFetcher, {
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            errorRetryInterval: 5000,
            refreshInterval: 1.5 * 60 * 1000, // 1.5 minute * 60 seconds * 1.5000 milliseconds = 1.5 minutes
            onSuccess: (data) => {
                setAuthUser(data.data.user);
                setAuthCheck(true);
            },
            onError: (error) => {
                if (error.response?.status === 401) {
                    setAuthUser(undefined);
                    setAuthCheck(false);
                    if (hasCookie(TOKEN_COOKIE_KEY)) deleteCookie(TOKEN_COOKIE_KEY);
                }
            },
            onErrorRetry: (error, key, config, revalidate, revalidateOpts) => {
                if (error.response?.status === 401) return
                
                if (error.response?.status === 503) return

                if (revalidateOpts.retryCount >= 5) return

                setTimeout(() => revalidate({ retryCount: revalidateOpts.retryCount }), 5000)
            },
        },
    );

    return {
        isLoading,
        isValidating,
        isServerDown: errorResult?.response?.status === 503,
        serverDownStatus: errorResult?.response?.status,
        serverDownMessage: errorResult?.response?.statusText,
    };
};
