import { t as translate } from "@/i18n";
import { useLanguageStore } from "@/store";

export const useTranslation = () => {
  const { language } = useLanguageStore();
  return { t: translate, language };
};
