import type { Ref } from "vue";

export interface LayoutSetting {
  [key: string]: Ref<boolean>;
  menuExpanded: Ref<boolean, boolean>;
  refreshTrigger: Ref<boolean, boolean>;
}

export enum LayoutSettingKeyEnum {
  menuExpanded = "menuExpanded",
  refreshTrigger = "refreshTrigger",
}
