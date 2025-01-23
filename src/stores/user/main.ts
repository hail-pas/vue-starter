import { defineStore } from "pinia";
import { type AccountInfo } from "@/api/types";
import { StoreKeyEnum } from "@/stores/enum";

export const useUserInfoStore = defineStore(StoreKeyEnum.userInfo, () => {
  let token: string | null =
    localStorage.getItem(StoreKeyEnum.userToken) || null;

  let accountInfo: AccountInfo | null = null;

  function setToken(t: string) {
    token = t;
    localStorage.setItem(StoreKeyEnum.userToken, token);
  }

  function getToken() {
    return token;
  }

  function setAccountInfo(ai: AccountInfo) {
    accountInfo = ai;
  }

  function getAccountInfo() {
    return accountInfo;
  }

  return { setToken, getToken, setAccountInfo, getAccountInfo };
});
