import axios from 'axios';
import store from '@/store';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://phplaravel-1239567-4600161.cloudwaysapps.com/api/',
    timeout: 100000,
});

// Request interceptor for adding Authorization headers, etc.
axiosInstance.interceptors.request.use(
    config => {
        const token = store.getters.token;
        if (token) {
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor for handling responses globally
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
