import type { PageFilterSchema } from "@/api/types";

export interface SystemResourceListFilterSchema extends PageFilterSchema {
  type?: string;
  label?: string;
  parent_id?: number;
}

export interface SystemResourceList {
  id: number;
  parent_id: number | null;
  code: string;
  type: string;
  label: string;
  order: number;
}

export interface SystemResourceCreateSchema {
  parent_id: number | null;
  code: string;
  type: string;
  label: string;
  order: number;
}

export interface SystemResourceUpdateSchema {
  id: number;
  label: string;
  order: number;
}
