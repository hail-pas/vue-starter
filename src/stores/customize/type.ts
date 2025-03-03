import type { Ref } from "vue";

export interface CustomizeSetting {
  menuExpanded: Ref<boolean, boolean>;
}

export enum CustomizeSettingKeyEnum {
  menuExpanded = "menuExpanded",
}
