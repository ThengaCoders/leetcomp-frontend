import axios from 'axios';

// Get the base URL from .env (Best Practice)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // If using cookies
});

// THE INTERCEPTOR (The Automatic Key Attacher)
api.interceptors.request.use((config) => {
    // 1. Look for the token in the browser's pocket
    const token = localStorage.getItem("token"); 
    
    // 2. If found, stick it onto the request header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;