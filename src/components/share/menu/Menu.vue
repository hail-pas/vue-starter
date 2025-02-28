<script setup lang="ts">
import type { SystemResource } from "@/api/auth/types";
import { useRouter } from "vue-router";

defineProps({
  systemResources: {
    type: Array<SystemResource>,
  },
});

let $router = useRouter();

function routeMain(routePath: string) {
  $router.push(routePath);
}
</script>

<script lang="ts">
export default {
  name: "MenuItems",
};
</script>

<template>
  <template v-for="resource in systemResources" :key="resource.id.toString()">
    <template v-if="resource.enabled">
      <el-menu-item
        v-if="resource.children.length == 0"
        :index="resource.route_path"
        :id="resource.id"
        @click="routeMain(resource.route_path)"
      >
        <template v-if="resource.icon_path">
          <el-icon>
            <component :is="resource.icon_path"></component>
          </el-icon>
        </template>
        <template #title>
          <span>
            {{ resource.label }}
          </span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="resource.route_path" :id="resource.id">
        <template #title>
          <template v-if="resource.icon_path">
            <el-icon>
              <component :is="resource.icon_path"></component>
            </el-icon>
          </template>
          <span>
            {{ resource.label }}
          </span>
        </template>
        <MenuItems :system-resources="resource.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item:hover span,
.el-sub-menu__title:hover span,
.el-icon:hover {
  color: #409eff;
}
</style>
