import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ua from "./locales/ua.json";

const defaultFallback = "ua";
const defaultTranslationNamespace = "translation";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: defaultTranslationNamespace,
    fallbackLng: defaultFallback,
    resources: {
      en: {
        translation: en,
      },
      ua: {
        translation: ua,
      },
    },
    react: {
      useSuspense: true,
    }
  });

i18next.on("languageChanged", (lng) => {
  console.log(`Language changed to: ${lng}`);
});

export default i18next;
