<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n();

defineProps({
  avatarPath: {
    type: String,
    default: "https://avatars.githubusercontent.com/u/42133281?v=4",
  },
  username: {
    type: String,
    default: "用户名",
  },
});
</script>

<template>
  <el-button type="primary" size="small" icon="Refresh" circle></el-button>
  <el-button type="primary" size="small" icon="FullScreen" circle></el-button>
  <el-button type="primary" size="small" icon="Setting" circle></el-button>
  <img :src="avatarPath" />
  <el-dropdown>
    <span class="el-dropdown-link">
      hi, <span class="username">{{ username }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ $t("login.logout") }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.username {
  font-weight: bold;
}

img {
  height: 2rem;
  border-radius: 1rem;
  margin-left: 0.4rem;
  margin-right: 0.2rem;
}
</style>
