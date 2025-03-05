<script setup lang="ts">
import { computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { useLayoutSettingStore } from "@/stores/layout/main";
import { LayoutSettingKeyEnum } from "@/stores/layout/type";
import { useLanguageStore } from "@/stores/lang/main";
import router from "@/router/main";
import { RouteNameEnum } from "@/router/enum";
import { useUserInfoStore } from "@/stores/user/main";
import { useRoute } from "vue-router";
import { reqLogout } from "@/api/auth/auth";

const { t: $t } = useI18n();

const useLayoutSetting = useLayoutSettingStore();

const langStore = useLanguageStore();

const refresh = () => {
  useLayoutSetting.toggleSetting(LayoutSettingKeyEnum.refreshTrigger);
  nextTick(() => {
    useLayoutSetting.toggleSetting(LayoutSettingKeyEnum.refreshTrigger);
  });
};

const fullScreen = () => {
  let isFullScreen = document.fullscreenElement;
  if (!isFullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

let useUserInfo = useUserInfoStore();

let route = useRoute();

const logout = async () => {
  // 退出登录
  try {
    await reqLogout();
  } catch {
    return;
  }

  useUserInfo.clean();
  router.push({ name: RouteNameEnum.Login, query: { redirect: route.path } });
};

// const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/42133281?v=4";
const DEFAULT_USERNAME = "admin";

const avatarPath = computed(() => {
  return useUserInfo.getAccountInfo()?.avatar;
});

const username = computed(() => {
  return useUserInfo.getAccountInfo()?.username;
});

// defineProps({
//   avatarPath: {
//     type: String,
//     default: "",
//   },
//   username: {
//     type: String,
//     default: "",
//   },
// });
</script>

<template>
  <el-button
    :title="$t('home.btn.switchLanguage')"
    type="primary"
    size="small"
    icon="Switch"
    circle
    @click="langStore.toggleLanguage()"
  ></el-button>
  <el-button
    :title="$t('home.btn.refresh')"
    type="primary"
    size="small"
    icon="Refresh"
    circle
    @click="refresh()"
  ></el-button>
  <el-button
    :title="$t('home.btn.fullScreenControl')"
    type="primary"
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen()"
  ></el-button>
  <el-button
    :title="$t('home.btn.settings')"
    type="primary"
    size="small"
    icon="Setting"
    circle
  ></el-button>
  <img :src="avatarPath" v-if="avatarPath" />
  <div class="avartar" v-else>
    {{ (username ? username : DEFAULT_USERNAME).slice(0, 2).toUpperCase() }}
  </div>
  <el-dropdown>
    <span class="el-dropdown-link">
      hi,
      <span class="username">{{ username ? username : DEFAULT_USERNAME }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout()">{{
          $t("login.logout")
        }}</el-dropdown-item>
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
.avartar {
  font-size: 0.8rem;
  background-color: rgba(79, 161, 206, 0.54);
  border-radius: 50%;
  line-height: 2rem;
  text-align: center;
  height: 2rem;
  width: 2rem;
  margin-left: 0.4rem;
  margin-right: 0.2rem;
}
</style>
