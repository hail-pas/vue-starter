<script setup lang="ts">
import { useLayoutSettingStore } from "@/stores/layout/main";
import { LayoutSettingKeyEnum } from "@/stores/layout/type";
// import { getOrUpdateSystemResources } from '@/stores/user/utils';
import { useRoute } from "vue-router";
import { useUserInfoStore } from "@/stores/user/main";
import { computed, onMounted } from "vue";
import { getOrUpdateSystemResources } from "@/stores/user/utils";

const useLayoutSetting = useLayoutSettingStore();

let $route = useRoute();
const userInfoStore = useUserInfoStore();

onMounted(async () => {
  await getOrUpdateSystemResources();
});

const matchedRoutes = computed(() => {
  return $route.matched.filter((i) => i.path! !== "/");
});

const menuExpanded = computed(() => {
  return useLayoutSettingStore().getLayoutSetting().menuExpanded;
});
</script>

<template>
  <el-icon
    @click="useLayoutSetting.toggleSetting(LayoutSettingKeyEnum.menuExpanded)"
    class="menu-control"
  >
    <component :is="menuExpanded ? 'Expand' : 'Fold'"> </component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in matchedRoutes"
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
      <span style="vertical-align: middle">
        {{
          userInfoStore.getSystemResourcesByRoutePath(item.path)
            ? $t(
                `menu.${userInfoStore.getSystemResourcesByRoutePath(item.path)?.code}`,
              )
            : ""
        }}</span
      >
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
