import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


interface RequestOptions {
    params?: Record<string, any>;
    data?: any;
    token?: string;
}

export const apiRequest = async <T>(
    method: Method,
    url: string,
    options: RequestOptions = {}
): Promise<T> => {
    const { params, data, token } = options;

    const config: AxiosRequestConfig = {
        method,
        url,
        params,
        data,
        headers: {},
    };

    if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
    }

    const response = await apiClient.request<T>(config);
    return response.data;
};