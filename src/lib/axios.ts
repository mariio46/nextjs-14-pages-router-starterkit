import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Accept: 'application/json',
    },
});

// Conditionally log requests only in development mode
// if (process.env.NODE_ENV === 'development') {
//     axios.interceptors.request.use((request) => {
//         console.log('Starting Axios Request', request);
//         return request;
//     });

//     axios.interceptors.response.use(
//         (response) => {
//             console.log('Axios Response:', response);
//             return response;
//         },
//         (error) => {
//             console.error('Axios Error Response:', error);
//             return Promise.reject(error);
//         },
//     );
// }

export default axios;
