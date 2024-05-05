import { TOKEN_COOKIE_KEY } from './api/key';
import axios from './axios';
import { getAxiosHeadersWithToken } from './utils';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// prettier-ignore
export const authFetcher = (url: string) => axios.get(url, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY)).then((res) => res.data);
