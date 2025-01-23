import SvgIcon from "@/components/global/SvgIcon.vue";
import { type App } from "vue";

export default {
  install(app: App) {
    app.component("SvgIcon", SvgIcon);
  },
};
