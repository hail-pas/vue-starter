import type { PageFilterSchema } from "@/api/types";

export interface SystemResourceListFilterSchema extends PageFilterSchema {
  type?: string;
  parent_id?: number;
}

export interface SystemResourceList {
  id: number;
  parent_id: number | null;
  type: string;
  label: string;
}

export interface SystemResourceCreateSchema {
  parent_id: number | null;
  type: string;
  label: string;
}

export interface SystemResourceUpdateSchema {
  parent_id: number | null;
  type: string;
  label: string;
}
