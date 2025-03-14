import type { RoleListFilterSchema, RoleList } from "@/api/role/types";
import { http } from "@/common/request";
import { type PageResponse } from "@/api/types";

enum APIV1 {
  ROLE = "/v1/role",
}

export const reqGetRoleList = (params?: RoleListFilterSchema) => {
  return http.get<PageResponse<RoleList>>(APIV1.ROLE, {
    withCredentials: true,
    params: params,
  });
};
