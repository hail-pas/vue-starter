import { createApp } from "vue";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import App from "./App.vue";

const app = createApp(App)

// element-plus
app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// global components
import globalComponents from "@/components";
app.use(globalComponents);

// normalize scss
import "@/assets/styles/main.scss";

// mount app
app.mount("#app");

