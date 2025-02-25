<script setup lang="ts">
import { showLogoTitleMinScreenWidth } from "@/common/globals";
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
  logoIconName: {
    type: String,
    default: "-",
  },
  logoTitle: {
    type: String,
    // required: true,
    default: "PoverTool",
  },
});

const minScreenWidth = showLogoTitleMinScreenWidth;

const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const realLogoTitle = computed(() => {
  return screenWidth.value >= minScreenWidth ? props.logoTitle : "";
});
</script>

<template>
  <div class="logo">
    <SvgIcon
      :name="props.logoIconName"
      v-if="props.showLogo && props.logoIconName != '-'"
    ></SvgIcon>
    <span class="logo_title">
      {{ realLogoTitle }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  margin: $base-logo-margin-top;
  text-align: center;

  svg {
    width: $base-logo-height;
    height: $base-logo-height;
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
