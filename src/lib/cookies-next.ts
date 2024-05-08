import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { TOKEN_COOKIE_KEY } from './api/key';

type RequestProps = IncomingMessage & { cookies: NextApiRequestCookies };
type ResponseProps = ServerResponse;
type ClientSideAuthorizationReturn = { Authorization: CookieValueTypes };
type ClientSideHeadersReturn = { headers: ClientSideAuthorizationReturn };
type GetClientSideAxiosHeadersReturn = ClientSideHeadersReturn | undefined;
type ServerSideAuthorizationReturn = { Authorization: CookieValueTypes };
type ServerSideHeadersReturn = { headers: ServerSideAuthorizationReturn };
type GetServerSideAxiosHeadersReturn = ServerSideHeadersReturn | undefined;

// Client Side
const clientSideToken = (): CookieValueTypes => {
    return hasCookie(TOKEN_COOKIE_KEY) ? `Bearer ${getCookie(TOKEN_COOKIE_KEY)}` : undefined;
};

const clientSideAuthorization = (): ClientSideAuthorizationReturn => {
    return { Authorization: clientSideToken() };
};

const clientSideHeaders = (): ClientSideHeadersReturn => {
    return { headers: clientSideAuthorization() };
};

const getClientSideAxiosHeaders = (): GetClientSideAxiosHeadersReturn => {
    return hasCookie(TOKEN_COOKIE_KEY) ? clientSideHeaders() : undefined;
};

// Server Side
const serverSideToken = (req: RequestProps, res: ResponseProps): CookieValueTypes => {
    // prettier-ignore
    return hasCookie(TOKEN_COOKIE_KEY, { req, res }) ? `Bearer ${getCookie(TOKEN_COOKIE_KEY, { req, res })}` : undefined;
};

const serverSideAuthorization = (req: RequestProps, res: ResponseProps): ServerSideAuthorizationReturn => {
    return { Authorization: serverSideToken(req, res) };
};

const serverSideHeaders = (req: RequestProps, res: ResponseProps): ServerSideHeadersReturn => {
    return { headers: serverSideAuthorization(req, res) };
};

const getServerSideAxiosHeaders = (req: RequestProps, res: ResponseProps): GetServerSideAxiosHeadersReturn => {
    return hasCookie(TOKEN_COOKIE_KEY, { req, res }) ? serverSideHeaders(req, res) : undefined;
};

export {
    clientSideAuthorization,
    clientSideHeaders,
    clientSideToken,
    getClientSideAxiosHeaders,
    getServerSideAxiosHeaders,
    serverSideAuthorization,
    serverSideHeaders,
    serverSideToken,
};
