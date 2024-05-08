import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { AuthUserType } from '@/types/user';
import { isAxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useEffect } from 'react';
import { BE_USER_DATA } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

export const useFetchAuthUserData = () => {
    const setAuthUser = useAuthUserState((state) => state.setUser);

    const setAuthCheck = useAuthUserState((state) => state.setCheck);
    const authCheck = useAuthUserState((state) => state.check);

    const validating = useAuthUserState((state) => state.validating);
    const isValidating = useAuthUserState((state) => state.isValidating);

    useEffect(() => {
        const getAuthUserData = async () => {
            try {
                const response = await axios.get<{ data: AuthUserType }>(BE_USER_DATA, getClientSideAxiosHeaders());
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

    return { validating };
};
