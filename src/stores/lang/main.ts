import { defineStore } from "pinia";
import { LanguageCodeEnum } from "@/i18n/enum";
import { StoreKeyEnum } from "@/stores/enum";
import { ref } from "vue";
// import { type Language } from "element-plus/es/locale";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { useI18n } from "vue-i18n";

export const useLanguageStore = defineStore(StoreKeyEnum.language, () => {
  const language = ref(
    localStorage.getItem(StoreKeyEnum.language) || LanguageCodeEnum.zh,
  );

  const { locale } = useI18n();
  locale.value = language.value;

  const eleLocale = ref(zhCn);

  function getLanguage() {
    return language;
  }

  function toggleLanguage() {
    const l =
      language.value === LanguageCodeEnum.zh
        ? LanguageCodeEnum.en
        : LanguageCodeEnum.zh;
    language.value = l;
    locale.value = l;
    eleLocale.value = l === LanguageCodeEnum.en ? en : zhCn;
    localStorage.setItem(StoreKeyEnum.language, l);
  }

  function getEleLocale() {
    return eleLocale;
  }

  return { getEleLocale, getLanguage, toggleLanguage };
});
