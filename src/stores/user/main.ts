import { defineStore } from "pinia";
import { type AccountInfo, type SystemResource } from "@/api/auth/types";
import { StoreKeyEnum } from "@/stores/enum";

export const useUserInfoStore = defineStore(StoreKeyEnum.userInfo, () => {
  let token: string | null =
    localStorage.getItem(StoreKeyEnum.userToken) || null;

  let accountInfo: AccountInfo | null = null;

  let systemResources: Array<SystemResource> | null = null;

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

  function setSystemResources(sr: Array<SystemResource>) {
    systemResources = sr;
  }

  function getSystemResources(): Array<SystemResource> | null {
    return systemResources;
  }

  return {
    setToken,
    getToken,
    setAccountInfo,
    getAccountInfo,
    setSystemResources,
    getSystemResources,
  };
});
