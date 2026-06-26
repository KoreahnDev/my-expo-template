import { getLocale, setLocale } from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Language = "ko" | "en";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  loadLanguage: () => Promise<void>;
}

const LANGUAGE_KEY = "language";

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: getLocale(),
  setLanguage: async (language) => {
    setLocale(language);
    set({ language });
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  },
  loadLanguage: async () => {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (saved === "ko" || saved === "en") {
      setLocale(saved);
      set({ language: saved });
    }
  },
}));
