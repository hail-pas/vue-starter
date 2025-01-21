import axios, { type InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});


request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
        return response.data;
    }
    ElMessage({
        type: 'error',
        message: response.data.message
      });
    return Promise.reject(response.data.message);
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    if (error.response.status >= 500) {
      ElMessage({
        type: 'error',
        message: '服务器错误，请稍后再试'
      });
    } else {
      ElMessage({
        type: 'error',
        message: error.response.data.message
      });
    }
    return Promise.reject(error);
  },
);

export default request;
