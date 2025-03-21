import type { PageFilterSchema } from "@/api/types";
import type { SystemResourceList } from "@/api/sys-resource/types";

export interface LoginSchema {
  username: string;
  password: string;
}

export interface RegisterSchema {
  username: string;
  password: string;
  name: string;
}

export interface AccountInfo {
  id: number;
  username: string;
  name: string;
  phone: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  expired_at: string;
  account: AccountInfo;
}

export interface SystemResourceFilterSchema extends PageFilterSchema {
  type?: string;
  // 为0，则筛选顶级菜单全层级
  parent_id?: number;
}

export type SystemResource = SystemResourceList;
