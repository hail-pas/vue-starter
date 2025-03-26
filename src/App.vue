<script setup lang="ts">
import { useLanguageStore } from "@/stores/lang/main";
const langStore = useLanguageStore();
</script>

<template>
  <el-config-provider :locale="langStore.getEleLocale().value">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
