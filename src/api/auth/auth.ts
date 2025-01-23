import { http } from "@/common/request";
import {
  type Response,
  type LoginResponse,
  type LoginSchema,
} from "@/api/types";

enum APIV1 {
  LOGIN = "/v1/auth/login",
  REGISTER = "/v1/auth/register",
  LOGOUT = "/v1/auth/logout",
  RESET_PASSWORD = "/v1/auth/reset-password",
  CHANGE_PASSWORD = "/v1/auth/change-password",
  FORGET_PASSWORD = "/v1/auth/forget-password",
}

export const reqLogin = (data: LoginSchema) =>
  http.post<Response<LoginResponse>>(APIV1.LOGIN, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });
