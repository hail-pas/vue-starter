import type { UserListFilterSchema, UserList } from "@/api/user/types";
import { http } from "@/common/request";
import { type PageResponse } from "@/api/types";

enum APIV1 {
  USER = "/v1/user",
}

export const reqGetUserList = (params?: UserListFilterSchema) => {
  return http.get<PageResponse<UserList>>(APIV1.USER, {
    withCredentials: true,
    params: params,
  });
};

export const reqDeleteUser = (id: number) => {
  return http.delete<PageResponse<UserList>>(APIV1.USER, {
    withCredentials: true,
    params: {
      id: id,
    },
  });
};
