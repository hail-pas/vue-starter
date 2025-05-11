import type { App, DirectiveBinding } from "vue";
import { useUserInfoStore } from "@/stores/user/main";
import type { FShowConfiguration } from "@/directives/types";

export const registerDirectives = (app: App) => {
  app.directive("cshow", {
    // 使用该指令的 dom 或 组件 挂载完成时会执行一次
    mounted(
      element: Element,
      binding: DirectiveBinding<FShowConfiguration, string, string>,
    ) {
      if (!binding.value.property || binding.value.property === "btn") {
        if (!useUserInfoStore().hasBtn(binding.value.value)) {
          element.parentNode?.removeChild(element);
        }
      } else {
        console.log(`Not support ${binding.value.property}`);
      }
    },
  });
};
