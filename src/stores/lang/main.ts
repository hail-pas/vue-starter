import { defineStore } from 'pinia'
import { LangCodeEnum } from "@/i18n/enum";
import { StoreKeyEnum } from "@/stores/enum";


export const useLanguageStore = defineStore(StoreKeyEnum.language, () => {
    let language = sessionStorage.getItem(StoreKeyEnum.language) || LangCodeEnum.zhCn

    function getLanguage() {
        return language;
    }

    function setLanguage(l:string) {
        language = l;
        sessionStorage.setItem(StoreKeyEnum.language, l);
    }

    return { language, getLanguage, setLanguage}
  })
