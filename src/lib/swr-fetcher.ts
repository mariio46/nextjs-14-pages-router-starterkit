import { getCookie } from 'cookies-next';
import { TOKEN_COOKIE_KEY } from './api/key';
import axios from './axios';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const authFetcher = (url: string) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${getCookie(TOKEN_COOKIE_KEY)}`,
            },
        })
        .then((res) => res.data);
