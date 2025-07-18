// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL:  process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('✅ [AXIOS INTERCEPTOR] token:', token);
  if (token && !config.url.includes('/login') && !config.url.includes('/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

console.log('✅ [AXIOS CONFIG] Base URL:', api.defaults.baseURL);

export default api;
