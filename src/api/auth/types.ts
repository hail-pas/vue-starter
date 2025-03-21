import type { PageFilterSchema } from "@/api/types";

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

export interface SystemResource {
  id: number;
  code: string;
  label: string;
  route_path: string;
  icon_path: string;
  type: string;
  order_num: number;
  enabled: boolean;
  assignable: boolean;
  parent_id: number;
  children: Array<SystemResource>;
}
