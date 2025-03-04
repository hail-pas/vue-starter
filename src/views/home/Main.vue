<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLayoutSettingStore } from "@/stores/layout/main";
import { computed } from "vue";

const { t: $t } = useI18n();

const useLayoutSetting = useLayoutSettingStore();

const refreshTrigger = computed(() => {
  return useLayoutSetting.getLayoutSetting().refreshTrigger;
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <!-- 主要内容 -->
      <component :is="Component" v-if="refreshTrigger"></component>
      <template v-else>
        {{ $t("home.loading") }}
      </template>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
