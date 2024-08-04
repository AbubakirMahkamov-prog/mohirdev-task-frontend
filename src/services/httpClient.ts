import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from './navigation'; // Import the history object
// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://api-mohirdev.abubakir.uz';
const httpClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

httpClient.interceptors.request.use(
    function (config) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return response;
    },
    function (error: AxiosError) {
        if (error.response?.status === 401) {
            history.push('/login');
          }
        return Promise.reject(error);
    }
);

export default httpClient
