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
        :index="resource.id.toString()"
        @click="routeMain(resource.route_path)"
      >
        <span>
          <template v-if="resource.icon_path">
            <el-icon>
              <component :is="resource.icon_path"></component>
            </el-icon>
          </template>
          {{ resource.label }}
        </span>
      </el-menu-item>
      <el-sub-menu v-else :index="resource.id.toString()">
        <template #title
          ><span>
            <template v-if="resource.icon_path">
              <el-icon>
                <component :is="resource.icon_path"></component>
              </el-icon>
            </template>
            {{ resource.label }}
          </span></template
        >
        <MenuItems :system-resources="resource.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item:hover span,
.el-sub-menu__title:hover span {
  color: black;
}
</style>
