import { createI18n } from "vue-i18n";

import en from "@/i18n/locales/en";
import zhCn from "@/i18n/locales/zh-cn"

const i18n = createI18n(
    {
        legacy: false,
        locale: sessionStorage.getItem('localLang') || 'zhCn',
        messages: {
            en,
            zhCn
        }
    }
)

export default i18n
