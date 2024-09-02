// i18n.js
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

const messages = {
  en,
  nl,
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") || "nl", // Initialize locale from localStorage
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

export default i18n;
