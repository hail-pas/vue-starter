export interface RoleList {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface RoleListFilterSchema {
  label?: string;
}
