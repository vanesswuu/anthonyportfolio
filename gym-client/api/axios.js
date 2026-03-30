import axios from 'axios';

//1. Create the base instance
const API = axios.create({
    baseURL: 'http://localhost:5001/api'
});

//2. The INTERCEPTOR: This runs before every single request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;

}, (error) => {
    return Promise.reject(error);
})

export default API;