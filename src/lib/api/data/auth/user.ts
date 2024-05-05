import { ApiResponse } from '@/types/api-response';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { type IncomingMessage, type ServerResponse } from 'http';
import { type NextApiRequestCookies } from 'next/dist/server/api-utils';
import { FE_CHECK_TOKEN_URL } from '../../end-point';
import { TOKEN_COOKIE_KEY } from '../../key';

interface TokenValidationResponse extends ApiResponse {
    data: string;
}

type ServerSideAuthUserDataProps = {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
    };
    res: ServerResponse;
};

type ServerSideAuthUserDataReturn = {
    isUnauthenticated: boolean;
    redirect?: {
        destination: string;
        permanent: boolean;
    };
};

export const getServerSideAuthUserData = async (
    option?: ServerSideAuthUserDataProps,
): Promise<ServerSideAuthUserDataReturn> => {
    const token = getCookie(TOKEN_COOKIE_KEY, { req: option?.req, res: option?.res });
    const response = await fetch(FE_CHECK_TOKEN_URL, {
        body: JSON.stringify({ token: token }),
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const data: TokenValidationResponse = await response.json();

    if (data.code === 401 && hasCookie(TOKEN_COOKIE_KEY, { req: option?.req, res: option?.res })) {
        deleteCookie(TOKEN_COOKIE_KEY, { req: option?.req, res: option?.res });
    }

    if (data.code === 401 || data.code !== 200) {
        return {
            isUnauthenticated: true,
            redirect: {
                destination: '/login',
                permanent: true,
            },
        };
    }

    return {
        isUnauthenticated: false,
    };
};
