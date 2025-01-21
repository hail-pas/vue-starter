<script setup lang="ts">
import ids from 'virtual:svg-icons-names'
import { onMounted } from 'vue';
// import SvgIcon from "@/components/global/SvgIcon.vue";

onMounted(() => {
  console.log(ids)
})

</script>

<template>
  <h2>Hello World</h2>
  <svg style="width: 30px; height: 30px;">
    <use href="#icon-message" fill="red"></use>
  </svg>
  <SvgIcon name="message" />
  <h2>Hello World</h2>
</template>

<style lang="scss" scoped>
h2 {
  color: $base-color;
}
</style>

