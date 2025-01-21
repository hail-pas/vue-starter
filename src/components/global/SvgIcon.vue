<template>
    <svg aria-hidden="true">
      <use :href="symbolId" :fill="color" />
    </svg>
  </template>

  <script setup lang="ts" name="SvgIcon">
  import { computed } from 'vue'

  // 接收父组件传入的 props
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
  })

  // 计算出 symbolId
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  </script>

  <style scoped>
  svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
  </style>
