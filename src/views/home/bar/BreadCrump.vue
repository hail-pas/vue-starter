<script setup lang="ts">
import { useCustomizeSettingStore } from "@/stores/customize/main";
import { CustomizeSettingKeyEnum } from "@/stores/customize/type";
// import { getOrUpdateSystemResources } from '@/stores/user/utils';
import { useRoute } from "vue-router";
import { useUserInfoStore } from "@/stores/user/main";

const useCustomizeSetting = useCustomizeSettingStore();

let $route = useRoute();
const userInfoStore = useUserInfoStore();

// const systemResources = getOrUpdateSystemResources(true);
</script>

<template>
  <el-icon @click="useCustomizeSetting.toggleMenu" class="menu-control">
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
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="userInfoStore.getSystemResourcesByRoutePath(item.path)"
      :to="item.path"
    >
      <el-icon style="vertical-align: middle">
        <component
          :is="
            userInfoStore.getSystemResourcesByRoutePath(item.path)?.icon_path
          "
          filled="black"
        ></component>
      </el-icon>
      <span style="vertical-align: middle">{{
        $t(
          `menu.${userInfoStore.getSystemResourcesByRoutePath(item.path)?.code}`,
        )
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.menu-control {
  margin-bottom: -2px;
  margin-right: 1rem;
}

.menu-control:hover {
  cursor: pointer;
}

.el-breadcrumb .el-breadcrumb-item .el-icon,
span {
  vertical-align: middle;
}
</style>
