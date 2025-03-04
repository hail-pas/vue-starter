import { reqGetSystemResource } from "@/api/auth/auth";
import type { SystemResource } from "@/api/auth/types";
import { useUserInfoStore } from "@/stores/user/main";

export async function getOrUpdateSystemResources(
  forceUpdate: boolean = false,
): Promise<SystemResource[]> {
  let systemResources = useUserInfoStore().getSystemResources();

  if (systemResources.length > 0) {
    return systemResources;
  }

  if (!forceUpdate && systemResources.length > 0) {
    return systemResources;
  }

  await reqGetSystemResource().then((res) => {
    if (res.data.length > 0) {
      useUserInfoStore().setSystemResources(res.data);
      systemResources = res.data;
    }
  });
  return systemResources;
}
