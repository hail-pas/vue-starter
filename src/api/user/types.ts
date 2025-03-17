import type { RoleList } from "@/api/role/types";

export interface UserList {
  id: number;
  username: string;
  nickname: string;
  phone: string;
  role: RoleList;
  avatar?: string;
  is_super_admin?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserListFilterSchema {
  username?: string;
  username__like?: string;
  phone?: string;
  role_id?: string;
  created_at__gte?: Date;
  created_at__lte?: Date;
}

export interface UserCreateSchema {
  username: string;
  nickname: string;
  phone: string;
  role_id: number | undefined;
}

export interface UserUpdateSchema {
  id: number;
  nickname: string;
  role_id: number;
}
