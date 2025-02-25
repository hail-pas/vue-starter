<script setup lang="ts">
import type { SystemResource } from "@/api/auth/types";
// import { sideMenuBackgroundColor, sideMenuTextColor } from '@/common/globals';

defineProps({
  systemResources: {
    type: Array<SystemResource>,
  },
});
</script>

<template>
  <el-menu>
    <template v-for="resource in systemResources" :key="resource.id">
      <el-menu-item v-if="!resource.children" :index="resource.id">{{
        resource.label
      }}</el-menu-item>
      <el-sub-menu v-else :index="resource.id">
        <template #title>{{ resource.label }}</template>
        <el-menu-item
          v-for="child in resource.children"
          :key="child.id"
          :index="child.id"
        >
          {{ child.label }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped></style>
