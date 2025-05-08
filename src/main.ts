import { createApp } from "vue";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import i18n from "@/i18n/main";
// normalize scss
import "@/styles/main.scss";
// global components
import globalComponents from "@/components";
// store
import { storeInstance } from "@/stores/main";
// router
import router from "@/router/main";

import App from "./App.vue";

const app = createApp(App);

// pinia
app.use(storeInstance);

// i18n
app.use(i18n);

// element-plus
app.use(ElementPlus, {
  locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// global components
app.use(globalComponents);

// router
app.use(router);

// mount app
app.mount("#app");
