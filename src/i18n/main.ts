import { createI18n } from "vue-i18n";

import en from "@/i18n/locales/en";
import zhCn from "@/i18n/locales/zh-cn";
import { StoreKeyEnum } from "@/stores/enum";
import { LanguageCodeEnum } from "@/i18n/enum";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(StoreKeyEnum.language) || LanguageCodeEnum.zh,
  messages: {
    en,
    zhCn,
  },
});

export default i18n;
