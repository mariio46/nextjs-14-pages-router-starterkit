import { BE_CHECK_TOKEN } from '@/lib/api/end-point';
import axios from '@/lib/axios';
import { ApiResponse } from '@/types/api-response';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function tokenValidation(request: NextApiRequest, response: NextApiResponse) {
    /**
     * token_cookie = is used to access directly from api
     */
    const token_cookie = `Bearer ${request.cookies.authApiToken}`;

    /**
     * token_headers = is used to access from any page used this url.
     * when page want to access they need to put the token in authorization.
     */
    const token_headers = request.headers.authorization;

    const token_status: ApiResponse & { data: string } = await axios
        .get(BE_CHECK_TOKEN, { headers: { Authorization: token_headers ?? token_cookie } })
        .then((r) => r.data)
        .catch((e) => e.response.data);

    response.status(200).json(token_status);
}
