import type { PageFilterSchema } from "@/api/types";

export interface RoleList {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface RoleListFilterSchema extends PageFilterSchema {
  label?: string;
}

export interface RoleCreateSchema {
  label: string;
}

export interface RoleUpdateSchema {
  label: string;
}
