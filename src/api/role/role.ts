import type {
  RoleListFilterSchema,
  RoleList,
  RoleDetail,
  RoleCreateSchema,
  RoleUpdateSchema,
} from "@/api/role/types";
import { http } from "@/common/request";
import { type PageResponse, type Response } from "@/api/types";

enum APIV1 {
  ROLE = "/v1/role",
}

export const reqGetRoleList = (params?: RoleListFilterSchema) => {
  return http.get<PageResponse<RoleList>>(APIV1.ROLE, {
    withCredentials: true,
    params: params,
  });
};

export const reqGetRoleDetail = (id: number) => {
  return http.get<Response<RoleDetail>>(`${APIV1.ROLE}/${id}`, {
    withCredentials: true,
  });
};

export const reqDeleteRole = (id: number) => {
  return http.delete<PageResponse<null>>(APIV1.ROLE, {
    withCredentials: true,
    params: {
      id: id,
    },
  });
};

export const reqCreateRole = (data: RoleCreateSchema) => {
  return http.post<Response<null>>(APIV1.ROLE, data, {
    withCredentials: true,
  });
};

export const reqUpdateRole = (data: RoleUpdateSchema) => {
  return http.put<Response<null>>(APIV1.ROLE, data, {
    withCredentials: true,
  });
};
