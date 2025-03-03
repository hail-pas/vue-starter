import { defineStore } from "pinia";
import { type AccountInfo, type SystemResource } from "@/api/auth/types";
import { StoreKeyEnum } from "@/stores/enum";

export const useUserInfoStore = defineStore(StoreKeyEnum.userInfo, () => {
  let token: string | null =
    localStorage.getItem(StoreKeyEnum.userToken) || null;

  let accountInfo: AccountInfo | null = null;

  const systemResourcesMap: Map<string, SystemResource> = new Map();
  const systemResourcesFlatMap: Map<string, SystemResource> = new Map();

  function setToken(t: string) {
    token = t;
    localStorage.setItem(StoreKeyEnum.userToken, token);
  }

  function getToken(): string | null {
    return token;
  }

  function setAccountInfo(ai: AccountInfo) {
    accountInfo = ai;
  }

  function getAccountInfo(): AccountInfo | null {
    return accountInfo;
  }

  function _setSystemResourcesFlatMap(sr: SystemResource) {
    if (!sr) {
      return;
    }
    systemResourcesFlatMap.set(sr.route_path, sr);
    for (const subSr of sr.children) {
      _setSystemResourcesFlatMap(subSr);
    }
  }

  function setSystemResources(srs: Iterable<SystemResource>) {
    for (const element of srs) {
      systemResourcesMap.set(element.route_path, element);
      _setSystemResourcesFlatMap(element);
    }
  }

  function getSystemResources(): Array<SystemResource> {
    return Array.from(systemResourcesMap.values());
  }

  function getSystemResourcesByRoutePath(
    routePath: string,
  ): SystemResource | undefined {
    return systemResourcesFlatMap.get(routePath);
  }

  return {
    setToken,
    getToken,
    setAccountInfo,
    getAccountInfo,
    setSystemResources,
    getSystemResources,
    getSystemResourcesByRoutePath,
  };
});
