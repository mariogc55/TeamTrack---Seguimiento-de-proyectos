// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; 

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('user-token'); 
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;