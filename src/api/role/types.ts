import type { PageFilterSchema } from "@/api/types";

export interface RoleList {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface RoleDetail {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
  system_resources: Array<number>;
}

export interface RoleListFilterSchema extends PageFilterSchema {
  label?: string;
}

export interface RoleCreateSchema {
  label: string;
  system_resources: Array<number>;
}

export interface RoleUpdateSchema {
  id: number;
  label: string;
  system_resources: Array<number>;
}
