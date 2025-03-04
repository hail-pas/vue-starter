export interface LayoutSetting {
  [key: string]: boolean;
  menuExpanded: boolean;
  refreshTrigger: boolean;
}

export enum LayoutSettingKeyEnum {
  menuExpanded = "menuExpanded",
  refreshTrigger = "refreshTrigger",
}
