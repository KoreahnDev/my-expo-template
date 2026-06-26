import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en";
import ko from "./ko";

const i18n = new I18n({ ko, en });

const locale = getLocales()[0]?.languageCode ?? "en";
i18n.locale = locale.startsWith("ko") ? "ko" : "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// 누락된 키 처리
i18n.missingTranslation.get = (scope) => {
  const key = typeof scope === "string" ? scope : scope.join(".");
  if (__DEV__) {
    console.warn(`[i18n] Missing translation: ${key}`);
  }
  return key.split(".").pop() ?? key;
};

export const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, options);

export const setLocale = (locale: "ko" | "en") => {
  i18n.locale = locale;
};

export const getLocale = () => i18n.locale as "ko" | "en";

export default i18n;
