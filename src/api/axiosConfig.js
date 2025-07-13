// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('✅ [AXIOS INTERCEPTOR] token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

console.log('✅ [AXIOS CONFIG] Base URL:', api.defaults.baseURL);

export default api;
