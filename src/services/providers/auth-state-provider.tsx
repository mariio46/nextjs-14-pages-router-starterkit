import { Loading } from '@/components/loading';
import { useLoading } from '@/hooks/use-loading';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import { AuthUserType } from '@/types/user';
import { AxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
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
                    router.reload();
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

    if (!loading) return <Loading />;

    return children;
};
