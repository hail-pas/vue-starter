import { defineStore } from "pinia";
import { StoreKeyEnum } from "@/stores/enum";
import { ref, type Ref } from "vue";
import {
  type LayoutSettingKeyEnum,
  type LayoutSetting,
} from "@/stores/layout/type";

export const useLayoutSettingStore = defineStore(
  StoreKeyEnum.layoutSetting,
  () => {
    const layoutSetting: LayoutSetting = {
      menuExpanded: ref(true),
      refreshTrigger: ref(true),
    };

    function toggleSetting(settingKey: LayoutSettingKeyEnum) {
      layoutSetting[settingKey].value = !layoutSetting[settingKey].value;
      localStorage.setItem(StoreKeyEnum.layoutSetting, JSON.stringify(layoutSetting));
    }

    function getLayoutSettingByKey(
      key: LayoutSettingKeyEnum,
    ): Ref<boolean, boolean> | Ref<string, string> | undefined {
      if (!localStorage.getItem(StoreKeyEnum.layoutSetting)) {
        try {
          const layoutSettingCached = JSON.parse(
            localStorage.getItem(StoreKeyEnum.layoutSetting)!,
          );
          console.log(layoutSettingCached);

          for (const key in layoutSetting) {
            console.log("type: ", key, typeof layoutSettingCached[key]);

            if (typeof layoutSettingCached[key] == "boolean") {
              layoutSetting[key] = ref(layoutSettingCached[key]);
            }
          }
        } catch {
          /* empty */
        }
      }
      return layoutSetting[key];
    }
    return {
      toggleSetting,
      getLayoutSettingByKey,
    };
  },
);
