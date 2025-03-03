<script setup lang="ts">
import { useCustomizeSettingStore } from "@/stores/customize/main";
import { CustomizeSettingKeyEnum } from "@/stores/customize/type";
// import { getOrUpdateSystemResources } from '@/stores/user/utils';
import { useRoute } from "vue-router";
import { getResourceByPath } from "@/stores/user/utils";

const useCustomizeSetting = useCustomizeSettingStore();

let $route = useRoute();
console.log($route.matched);

function mapper(item) {
  console.log(item.path);
  console.log(getResourceByPath(item.path));
  console.log(getResourceByPath(item.path)?.code);
  return item;
}

$route.matched.map(mapper);

// const systemResources = getOrUpdateSystemResources(true);
</script>

<template>
  <el-icon @click="useCustomizeSetting.toggleMenu">
    <component
      :is="
        useCustomizeSetting.getCustomizeSettingByKey(
          CustomizeSettingKeyEnum.menuExpanded,
        )?.value
          ? 'Expand'
          : 'Fold'
      "
    >
    </component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
      <el-icon :is="getResourceByPath(item.path)?.icon_path"></el-icon>
      <a :href="getResourceByPath(item.path)?.route_path">{{
        $t(`menu.${getResourceByPath(item.path)?.code}`)
      }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-icon {
  margin-right: 0.5rem;
}

.el-icon:hover {
  cursor: pointer;
}
</style>
