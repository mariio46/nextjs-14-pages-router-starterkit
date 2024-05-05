import { BE_CHECK_TOKEN_URL } from '@/lib/api/end-point';
import { ApiResponse } from '@/types/api-response';
import type { NextApiRequest, NextApiResponse } from 'next';

interface TokenValidationResponse extends ApiResponse {
    data: string;
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse<TokenValidationResponse>) {
//     // prettier-ignore
//     const headers = {headers: { Authorization: `Bearer ${getCookie(TOKEN_COOKIE_KEY, { req, res })}` }};

//     try {
//         const response = await axios.get(BE_CHECK_TOKEN_URL, headers);
//         console.log(response);
//         const data: TokenValidationResponse = await response.data;

//         // if (response.ok) {
//         res.status(200).json(data);
//         // } else {
//         //     res.status(data.code).json(data);
//         // }
//     } catch (error: any) {
//         console.log(error);
//         res.status(200).json(error.response);
//     }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<TokenValidationResponse>) {
    const token = req.body.token;

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(BE_CHECK_TOKEN_URL, headers);

    const data: TokenValidationResponse = await response.json();

    if (response.ok) {
        res.status(response.status).json(data);
    } else {
        res.status(data.code).json(data);
    }
}
