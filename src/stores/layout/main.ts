import { defineStore } from "pinia";
import { StoreKeyEnum } from "@/stores/enum";
import { reactive, type Reactive } from "vue";
import {
  type LayoutSettingKeyEnum,
  type LayoutSetting,
} from "@/stores/layout/type";

export const useLayoutSettingStore = defineStore(
  StoreKeyEnum.layoutSetting,
  () => {
    const layoutSetting: Reactive<LayoutSetting> = _initialize();

    function _initialize(): Reactive<LayoutSetting> {
      const ls: LayoutSetting = {
        menuExpanded: true,
        refreshTrigger: true,
      };
      if (localStorage.getItem(StoreKeyEnum.layoutSetting)) {
        try {
          const layoutSettingCached = JSON.parse(
            localStorage.getItem(StoreKeyEnum.layoutSetting)!,
          );
          for (const key in ls) {
            if (typeof layoutSettingCached[key] == "boolean") {
              ls[key] = layoutSettingCached[key];
            }
          }
        } catch {
          /* empty */
        }
      }
      return reactive(ls);
    }

    function toggleSetting(settingKey: LayoutSettingKeyEnum) {
      layoutSetting[settingKey] = !layoutSetting[settingKey];
      _cacheToLocal();
    }

    function _cacheToLocal() {
      localStorage.setItem(
        StoreKeyEnum.layoutSetting,
        JSON.stringify(layoutSetting),
      );
    }

    function getLayoutSetting() {
      return layoutSetting;
    }

    return {
      toggleSetting,
      getLayoutSetting,
    };
  },
);
