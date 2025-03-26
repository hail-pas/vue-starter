import type {
  SystemResourceListFilterSchema,
  SystemResourceList,
  SystemResourceCreateSchema,
  SystemResourceUpdateSchema,
} from "@/api/sys-resource/types";
import { http } from "@/common/request";
import { type Response } from "@/api/types";

enum APIV1 {
  SYSTEM_RESOURCE = "/v1/system-resource",
}

export const reqGetSystemResourceList = (
  params?: SystemResourceListFilterSchema,
) => {
  return http.get<Response<SystemResourceList[]>>(APIV1.SYSTEM_RESOURCE, {
    withCredentials: true,
    params: params,
  });
};

export const reqDeleteSystemResource = (id: number) => {
  return http.delete<Response<null>>(APIV1.SYSTEM_RESOURCE, {
    withCredentials: true,
    params: {
      id: id,
    },
  });
};

export const reqCreateSystemResource = (data: SystemResourceCreateSchema) => {
  return http.post<Response<null>>(APIV1.SYSTEM_RESOURCE, data, {
    withCredentials: true,
  });
};

export const reqUpdateSystemResource = (data: SystemResourceUpdateSchema) => {
  return http.put<Response<null>>(APIV1.SYSTEM_RESOURCE, data, {
    withCredentials: true,
  });
};
