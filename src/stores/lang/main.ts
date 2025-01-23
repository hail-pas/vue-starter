import { defineStore } from 'pinia'
import { LangCodeEnum } from "@/i18n/enum";
import { StoreKeyEnum } from "@/stores/enum";
import { ref } from 'vue';
// import { type Language } from "element-plus/es/locale";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from "element-plus/es/locale/lang/en";
import { useI18n } from 'vue-i18n';


export const useLanguageStore = defineStore(StoreKeyEnum.language, () => {
    const language = ref(sessionStorage.getItem(StoreKeyEnum.language) || LangCodeEnum.zh.toString())

    const { locale } = useI18n();

    const eleLocale = ref(zhCn)

    function getLanguage() {
        return language;
    }

    function setLanguage(l: LangCodeEnum) {
        language.value = l;
        locale.value = l;
        eleLocale.value = (l === LangCodeEnum.en ? en : zhCn);
        sessionStorage.setItem(StoreKeyEnum.language, l);
    }

    function getEleLocale() {
        return eleLocale
    }

    return { getEleLocale, getLanguage, setLanguage}
  })
