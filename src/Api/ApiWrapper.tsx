import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import API_CONFIG from "./ApiConfig";

class ApiWrapper {
    private axiosInstance : AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Add any custom headers or auth tokens here
                const token = localStorage.getItem("authToken");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle errors globally
                console.error("API Error:", error);
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get(url, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post(url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete(url, config);
    }
}

export const api = new ApiWrapper(API_CONFIG.erdogan.url);