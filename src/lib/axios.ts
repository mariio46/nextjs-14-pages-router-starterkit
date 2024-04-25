import Axios from 'axios';

const axios = Axios.create({
    baseURL: undefined,
    headers: {
        Accept: 'application/json',
    },
});

export default axios;
