import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utilities/axios-utils';
import { TOKEN_COOKIE_KEY } from '../../key';

export const getAllUsers = async () => {
    return await axios.get('/users', getAxiosHeadersWithToken(TOKEN_COOKIE_KEY)).then((res) => res.data);
};
