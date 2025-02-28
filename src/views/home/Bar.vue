<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";

defineProps({
  avatarPath: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "用户名",
  },
});
</script>

<template>
  <div class="header-bar">
    <div class="left">
      <el-icon>
        <Expand />
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">
          <el-icon>
            <HomeFilled />
          </el-icon>
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button type="primary" size="small" icon="Refresh" circle></el-button>
      <el-button
        type="primary"
        size="small"
        icon="FullScreen"
        circle
      ></el-button>
      <el-button type="primary" size="small" icon="Setting" circle></el-button>
      <img :src="avatarPath" :alt="username" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;
}
</style>
