<script setup lang="ts">
const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
  logoIconName: {
    type: String,
    default: "logo",
  },
  logoTitle: {
    type: String,
    // required: true,
    default: "PoverTool"
  },
})
</script>

<template>
    <div class="logo">
        <SvgIcon :name="props.logoIconName" v-if="props.showLogo"></SvgIcon>
        <span class="logo_title">
          {{ props.logoTitle }}
        </span>
      </div>
</template>

<style lang="scss" scoped>
.logo {
      margin: 10px;
      text-align: center;

      svg {
        width: 2.5em;
        height: 2.5em;
        // padding-right: 0.5em;
      }

      .logo_title {
        display: inline-block;
        height: 1em;
        vertical-align: bottom;
        font-size: 1.5em;
        font-family: Arial, "Microsoft YaHei";
        font-style: italic;
      }
    }
</style>