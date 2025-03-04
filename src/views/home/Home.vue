<script setup lang="ts">
import Logo from "@/components/share/Logo.vue";
import MenuItems from "@/views/home/Menu.vue";
import { RouteNameEnum } from "@/router/enum";
import router from "@/router/main";
import { getOrUpdateSystemResources } from "@/stores/user/utils";
import { ElMessage } from "element-plus";
import Main from "@/views/home/Main.vue";
import Bar from "@/views/home/bar/Bar.vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useLayoutSettingStore } from "@/stores/layout/main";
import { LayoutSettingKeyEnum } from "@/stores/layout/type";
import { computed, onMounted, ref, toRef } from "vue";

const useLayoutSetting = useLayoutSettingStore();

const { t: $t } = useI18n();

const systemResources = ref();

const menuExpanded = toRef(
  useLayoutSetting.getLayoutSettingByKey(LayoutSettingKeyEnum.menuExpanded),
);

onMounted(async () => {
  systemResources.value = await getOrUpdateSystemResources();
  // 没有菜单跳转到forbidden
  if (systemResources.value.length == 0) {
    ElMessage({
      type: "error",
      message: $t("login.sysResourceInvalid"),
    });
    router.push({ name: RouteNameEnum.Login });
    return;
  }
});

let route = useRoute();

const sideMenuClass = computed(() => {
  return menuExpanded.value ? "" : "menu_fold";
});

const logoTitle = computed(() => {
  let envLogoTitle = import.meta.env.VITE_LOGO_TITLE
    ? import.meta.env.VITE_LOGO_TITLE
    : "";
  if (!menuExpanded.value) {
    envLogoTitle = "";
  }
  return envLogoTitle;
});
</script>

<template>
  <div class="layout_container">
    <div class="side_menu" :class="sideMenuClass">
      <Logo logo-icon-name="logo" :logo-title="logoTitle"></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollBar">
        <el-menu :collapse="!menuExpanded" :default-active="route.path">
          <MenuItems :system-resources="systemResources!"></MenuItems>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="header" :class="sideMenuClass">
      <Bar></Bar>
    </div>
    <div class="content" :class="sideMenuClass">
      <Main></Main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .side_menu {
    position: fixed;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-side-menu-background-color;
    color: $base-side-menu-text-color;
    transition: all 0.1s;

    .scrollBar {
      width: 100%;
      height: calc(100vh - $base-logo-height - $base-logo-margin-top);

      .el-menu {
        --el-menu-bg-color: $base-side-menu-background-color;
        --el-menu-hover-bg-color: $base-side-menu-background-color;
        --el-menu-text-color: $base-side-menu-text-color;
        // --el-menu-hover-text-color: #409eff;
        // --el-menu-active-color: #409eff;
        border-right: none;
      }
    }

    &.menu_fold {
      width: $base-menu-collapsed-width;
    }
  }

  .header {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-header-height;
    transition: all 0.1s;

    &.menu_fold {
      left: $base-menu-collapsed-width;
      width: calc(100% - $base-menu-collapsed-width);
    }
  }

  .content {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-header-height);
    top: $base-header-height;
    left: $base-menu-width;
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;
    transition: all 0.1s;

    &.menu_fold {
      left: $base-menu-collapsed-width;
      width: calc(100% - $base-menu-collapsed-width);
    }
  }
}
</style>
