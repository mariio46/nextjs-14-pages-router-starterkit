import Axios from 'axios';
import { BACKEND_API_URL } from './api/end-point';

const axios = Axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        Accept: 'application/json',
    },
});

export default axios;
