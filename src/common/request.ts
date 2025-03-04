import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import i18n from "@/i18n/main";
import { useUserInfoStore } from "@/stores/user/main";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 5000,
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserInfoStore().getToken();
    if (token && config.withCredentials) {
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
    if (import.meta.env.DEV) {
      console.log(response);
    }
    if (response.data.code === 0) {
      return response.data;
    }
    const errorMessage = response.data.message
      ? response.data.message
      : "响应数据格式异常";
    ElMessage({
      type: "error",
      message: errorMessage,
    });
    // return Promise.reject(errorMessage);
    return new Promise(() => {});
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.log(error);
    }

    const status = error.response?.status;
    let errorMessage = i18n.global.t("error.unknownError");

    switch (status) {
      case 400:
        errorMessage = i18n.global.t("error.badRequest");
        break;
      case 401:
        errorMessage = i18n.global.t("error.unauthorized");
        break;
      case 403:
        errorMessage = i18n.global.t("error.forbidden");
        break;
      case 404:
        errorMessage = i18n.global.t("error.resourceNotFound");
        break;
      case 500:
        errorMessage = i18n.global.t("error.serverError");
        break;

      default:
        break;
    }

    ElMessage({
      type: "error",
      message: errorMessage,
    });
    // return Promise.reject(errorMessage);
    return new Promise(() => {});
  },
);

export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config);
  },

  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.post(url, data, config);
  },

  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.put(url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.delete(url, config);
  },
};
