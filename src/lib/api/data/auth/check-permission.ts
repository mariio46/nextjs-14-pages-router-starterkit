import { IncomingMessage, ServerResponse } from 'http';
import { Redirect } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

import { ApiResponse } from '@/types/api/response';

import axios from '@/lib/axios';
import { getServerSideAxiosHeaders } from '@/lib/cookies-next';

type RequestProps = IncomingMessage & { cookies: NextApiRequestCookies };
type ResponseProps = ServerResponse;
type OptionsType = {
    req: RequestProps;
    res: ResponseProps;
};
type CheckPermissionResponse = ApiResponse<boolean>;
type UseCheckPermissionReturn = { authorized: boolean };

// prettier-ignore
export const useCheckPermission = async (permissions: string[] | string, option: OptionsType): Promise<UseCheckPermissionReturn> => {
    const data = { permissions: permissions };

    const check_permission: CheckPermissionResponse = await axios
        .post('/permissions-check', data, getServerSideAxiosHeaders(option.req, option.res))
        .then((res) => res.data)
        .catch((error) => error.response.data);
    if (check_permission.code === 401 || check_permission.code !== 200) {
        return { authorized: false }
    }

    return { authorized: true };
};

type RedirectIfUnauthorizedType = { redirect: Redirect };

export const RedirectIfUnauthorized: RedirectIfUnauthorizedType = {
    redirect: {
        destination: `/dashboard`,
        permanent: true,
    },
};
