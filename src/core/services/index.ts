import axios from 'axios';

const createBackendServer = (baseURL: string) => {
    const api = axios.create({
        baseURL: `${baseURL}/api`,
        headers: { Accept: 'application/json' },
        timeout: 60 * 1000,
    });

    api.interceptors.response.use(
        response => response,
        error => {
            const message = error?.response?.data;
            error.message = message ?? error.message;
            /*if(error?.response?.data?.errors)
          error.errors = error?.response?.data?.errors;*/
            return Promise.reject(error);
        },
    );

    return {};
};

const baseURL = process.env['NEXT_PUBLIC_BASE_URL'] || '';

const apis = createBackendServer(baseURL);

export default apis;
