import { defineStore } from "pinia";
import { type AccountInfo, type SystemResource } from "@/api/auth/types";
import { StoreKeyEnum } from "@/stores/enum";

export const useUserInfoStore = defineStore(StoreKeyEnum.userInfo, () => {
  let token: string | null = null;

  let accountInfo: AccountInfo | null = null;

  const systemResourcesMap: Map<string, SystemResource> = new Map();
  const systemResourcesFlatMap: Map<string, SystemResource> = new Map();

  function _initialize() {
    token = localStorage.getItem(StoreKeyEnum.userToken);
    let cachedSystemResources: Array<SystemResource> = [];
    if (localStorage.getItem(StoreKeyEnum.systemResourcesMap)) {
      try {
        cachedSystemResources = JSON.parse(
          localStorage.getItem(StoreKeyEnum.systemResourcesMap)!,
        );
        if (cachedSystemResources.length > 0) {
          setSystemResources(cachedSystemResources);
        }
      } catch {
        /* empty*/
      }
    }
    if (localStorage.getItem(StoreKeyEnum.accountInfo)) {
      try {
        accountInfo = JSON.parse(
          localStorage.getItem(StoreKeyEnum.accountInfo)!,
        );
      } catch {
        /* empty */
      }
    }
  }

  _initialize();

  function setToken(t: string) {
    token = t;
    localStorage.setItem(StoreKeyEnum.userToken, token);
  }

  function getToken(): string | null {
    return token;
  }

  function setAccountInfo(ai: AccountInfo) {
    accountInfo = ai;
    localStorage.setItem(StoreKeyEnum.accountInfo, JSON.stringify(ai));
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
    localStorage.setItem(StoreKeyEnum.systemResourcesMap, JSON.stringify(srs));
  }

  function getSystemResources(): Array<SystemResource> {
    return Array.from(systemResourcesMap.values());
  }

  function getSystemResourcesByRoutePath(
    routePath: string,
  ): SystemResource | undefined {
    routePath = routePath == "/" ? "/index" : routePath;
    return systemResourcesFlatMap.get(routePath);
  }

  function clean() {
    localStorage.clear();
    accountInfo = null;
    systemResourcesMap.clear();
    systemResourcesFlatMap.clear();
  }

  return {
    setToken,
    getToken,
    setAccountInfo,
    getAccountInfo,
    setSystemResources,
    getSystemResources,
    getSystemResourcesByRoutePath,
    clean,
  };
});
