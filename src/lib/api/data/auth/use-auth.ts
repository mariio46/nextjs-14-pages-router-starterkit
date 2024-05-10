import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { ApiResponse } from '@/types/api/response';
import { AuthUserType } from '@/types/user';
import { AxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import useSWR from 'swr';
import { TOKEN_COOKIE_KEY } from '../../key';

const authFetcher = (url: string) => axios.get(url, getClientSideAxiosHeaders()).then((res) => res.data);

export const useAuth = () => {
    const setAuthUser = useAuthUserState((state) => state.setUser);
    const setAuthCheck = useAuthUserState((state) => state.setCheck);

    // prettier-ignore
    const { isLoading, isValidating } = useSWR<ApiResponse<AuthUserType>, AxiosError<{ message: string }>>('/user', authFetcher, {
            errorRetryCount: 1,
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            refreshInterval: 5 * 60 * 1000, // 5 minute * 60 seconds * 1000 milliseconds = 5 minutes
            onSuccess: (data) => {
                setAuthUser(data.data.user);
                setAuthCheck(true);
            },
            onError: () => {
                setAuthUser(undefined);
                setAuthCheck(false);
                if (hasCookie(TOKEN_COOKIE_KEY)) deleteCookie(TOKEN_COOKIE_KEY);
            },
        },
    );

    return { isLoading, isValidating };
};
