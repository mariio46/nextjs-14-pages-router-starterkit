import { FE_CHECK_TOKEN, FRONTEND_API_URL } from '@/lib/api/end-point';
import { TOKEN_COOKIE_KEY, TOKEN_DELETED_KEY, TOKEN_DELETED_VALUE } from '@/lib/api/key';
import axios from '@/lib/axios';
import type { ApiResponse } from '@/types/api-response';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { type IncomingMessage, type ServerResponse } from 'http';
import { type Redirect } from 'next';
import { type NextApiRequestCookies } from 'next/dist/server/api-utils';

type RequestProps = IncomingMessage & { cookies: NextApiRequestCookies };
type ResponseProps = ServerResponse;
type AuthUserTokenResponse = ApiResponse & { data: string };
type AuthUserTokenReturn = { authenticated: boolean };

export const cekAuthUserToken = async (req: RequestProps, res: ResponseProps): Promise<AuthUserTokenReturn> => {
    const token_status: AuthUserTokenResponse = await axios
        .get(FE_CHECK_TOKEN, {
            baseURL: FRONTEND_API_URL,
            headers: { Authorization: `Bearer ${req.cookies.authApiToken}` },
        })
        .then((r) => r.data)
        .catch((e) => e.response.data);

    if (token_status.code === 401 || token_status.code !== 200) {
        if (hasCookie(TOKEN_COOKIE_KEY, { req, res })) {
            console.log('Delete Token Triggered');
            deleteCookie(TOKEN_COOKIE_KEY, { req, res });
            setCookie(TOKEN_DELETED_KEY, TOKEN_DELETED_VALUE, { req, res, maxAge: 24 * 60 * 60 });
        }

        return { authenticated: false };
    }

    return { authenticated: true };
};

type RedirectIfUnauthencatedType = { redirect: Redirect };

export const RedirectIfUnauthencated: RedirectIfUnauthencatedType = {
    redirect: {
        destination: `/login?callback=/dashboard`,
        permanent: true,
    },
};