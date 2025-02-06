<script setup lang="ts">
import Logo from "@/components/share/Logo.vue";
</script>

<template>
  <div class="layout_container">
    <div class="side_menu">
      <Logo></Logo>
      <div class="menu">

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
    background-color: #001529;
    color: white;
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
