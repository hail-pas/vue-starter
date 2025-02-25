<script setup lang="ts">
import type { SystemResource } from "@/api/auth/types";
// import { sideMenuBackgroundColor, sideMenuTextColor } from '@/common/globals';

const props = defineProps({
  systemResources: {
    type: Array<SystemResource>,
  },
});
</script>

<template>
  <!-- <el-menu :background-color="sideMenuBackgroundColor" :text-color="sideMenuTextColor">
        <el-menu-item index="1">首页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>数据管理</template>
            <el-menu-item index="2-1">学生管理</el-menu-item>
            <el-menu-item index="2-2">班级管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>系统管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
        </el-sub-menu>
    </el-menu> -->
  <div>{{ props.systemResources }}</div>
</template>

<style lang="scss" scoped></style>
