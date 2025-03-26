export interface SystemResourceListFilterSchema {
  type?: string;
  label?: string;
  parent_id?: number;
  role_id?: number;
}

export interface SystemResourceList {
  id: number;
  code: string;
  label: string;
  route_path: string;
  icon_path: string;
  type: string;
  enabled: boolean;
  assignable: boolean;
  parent_id: number;
  children: Array<SystemResourceList>;
  order: number;
}

export interface SystemResourceCreateSchema {
  parent_id: number | null;
  code: string;
  type: string;
  label: string;
  order: number;
  enabled: boolean;
}

export interface SystemResourceUpdateSchema {
  id: number;
  label: string;
  order: number;
  enabled: boolean;
}
