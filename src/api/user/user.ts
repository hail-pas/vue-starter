import type {
  UserListFilterSchema,
  UserList,
  UserCreateSchema,
  UserUpdateSchema,
} from "@/api/user/types";
import { http } from "@/common/request";
import { type PageResponse, type Response } from "@/api/types";

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

export const reqCreateUser = (data: UserCreateSchema) => {
  return http.post<Response<null>>(APIV1.USER, data, {
    withCredentials: true,
  });
};

export const reqUpdateUser = (data: UserUpdateSchema) => {
  return http.put<Response<null>>(APIV1.USER, data, {
    withCredentials: true,
  });
};
