export interface LayoutSetting {
  [key: string]: boolean | number;
  menuExpanded: boolean;
  refreshTrigger: boolean;
  darkMode: boolean;
}

export enum LayoutSettingKeyEnum {
  menuExpanded = "menuExpanded",
  refreshTrigger = "refreshTrigger",
  darkMode = "darkMode",
}
