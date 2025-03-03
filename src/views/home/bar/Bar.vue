<script setup lang="ts">
import BreadCrump from "@/views/home/bar/BreadCrump.vue";
import Setting from "@/views/home/bar/Setting.vue";

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
  <div class="header-bar">
    <div class="left">
      <BreadCrump />
    </div>
    <div class="right">
      <Setting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, white, rgb(208, 234, 241), white);

  .left {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
}
</style>
