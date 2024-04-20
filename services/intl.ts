import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isHermes = !!global.HermesInternal;

if (isAndroid || isHermes) {
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en");
  require("@formatjs/intl-pluralrules/locale-data/pt");

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/pt");
}

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Could be anything that returns default preferred language
import { getLocales } from "expo-localization";

// Import all the languages you want here
import en from "@/locales/en/translation.json";
import pt from "@/locales/pt/translation.json";

const i18Config: any = {
  // Add any imported languages here
  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: "en", // This is the default language if none of the users preffered languages are available
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
};

export function i18nextInit() {
  i18next.use(initReactI18next).init(i18Config);
}