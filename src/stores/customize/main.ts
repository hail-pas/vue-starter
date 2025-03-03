import { defineStore } from "pinia";
import { StoreKeyEnum } from "@/stores/enum";
import { ref, type Ref } from "vue";
import {
  type CustomizeSettingKeyEnum,
  type CustomizeSetting,
} from "@/stores/customize/type";

export const useCustomizeSettingStore = defineStore(
  StoreKeyEnum.customSetting,
  () => {
    const customizeSetting: CustomizeSetting = {
      menuExpanded: ref(true),
    };

    function toggleMenu() {
      customizeSetting.menuExpanded.value =
        !customizeSetting.menuExpanded.value;
    }

    function getCustomizeSetting(): CustomizeSetting {
      return customizeSetting;
    }

    function getCustomizeSettingByKey(
      key: CustomizeSettingKeyEnum,
    ): Ref<boolean, boolean> | Ref<string, string> | undefined {
      return customizeSetting[key];
    }
    return {
      toggleMenu,
      getCustomizeSetting,
      getCustomizeSettingByKey,
    };
  },
);
