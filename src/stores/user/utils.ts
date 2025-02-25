import { reqGetSystemResource } from "@/api/auth/auth";
import { useUserInfoStore } from "@/stores/user/main";

export function getOrUpdateSystemResources(forceUpdate: boolean = false) {
  let systemResources = useUserInfoStore().getSystemResources();

  if (!forceUpdate && systemResources && systemResources.length > 0) {
    return systemResources;
  }

  reqGetSystemResource().then((res) => {
    if (res.data.length > 0) {
      useUserInfoStore().setSystemResources(res.data);
      systemResources = res.data;
    }
  });
  return systemResources;
}
