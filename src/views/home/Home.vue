<script setup lang="ts">
import Logo from "@/components/share/Logo.vue";
import Menu from "@/components/share/menu/Menu.vue";
import { RouteNameEnum } from "@/router/enum";
import router from "@/router/main";
import { getOrUpdateSystemResources } from "@/stores/user/utils";
import { ElMessage } from "element-plus";
// import { useUserInfoStore } from "@/stores/user/main";
// import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();

const systemResources = getOrUpdateSystemResources(true);

// 没有菜单跳转到forbidden
if (systemResources.length == 0) {
  ElMessage({
    type: "error",
    message: $t("login.sysResourceInvalid"),
  });
  router.push({ name: RouteNameEnum.Login });
}
</script>

<template>
  <div class="layout_container">
    <div class="side_menu">
      <Logo logo-icon-name="-"></Logo>
      <div class="menu">
        <!-- 滚动组件 -->
        <el-scrollbar class="scrollBar">
          <Menu :system-resources="systemResources!"></Menu>
        </el-scrollbar>
      </div>
    </div>
    <div class="header">header</div>
    <div class="content">lorem1000</div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: orange;

  .side_menu {
    position: fixed;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-side-menu-background-color;
    color: $base-side-menu-text-color;

    .scrollBar {
      width: 100%;
      height: calc(100vh - $base-logo-height - $base-logo-margin-top);
    }
  }

  .header {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-header-height;
    background-color: cyan;
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
  }
}
</style>
