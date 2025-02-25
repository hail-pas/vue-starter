import { http } from "@/common/request";
import { type Response } from "@/api/types";
import {
  type LoginResponse,
  type LoginSchema,
  type SystemResourceFilterSchema,
  type SystemResource,
} from "@/api/auth/types";

enum APIV1 {
  LOGIN = "/v1/auth/login",
  REGISTER = "/v1/auth/register",
  LOGOUT = "/v1/auth/logout",
  RESET_PASSWORD = "/v1/auth/reset-password",
  CHANGE_PASSWORD = "/v1/auth/change-password",
  FORGET_PASSWORD = "/v1/auth/forget-password",
  SYSTEM_RESOURCE = "/v1/auth/system-resource",
}

export const reqLogin = (data: LoginSchema) =>
  http.post<Response<LoginResponse>>(APIV1.LOGIN, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

export const reqGetSystemResource = (
  param: SystemResourceFilterSchema | null = null,
) => {
  const type = param ? param.type : "";
  const parent_id = param ? param.parent_id : 0;
  return http.get<Response<Array<SystemResource>>>(
    `${APIV1.SYSTEM_RESOURCE}?type=${type}&parent_id=${parent_id}`,
    {
      withCredentials: true,
    },
  );
};
