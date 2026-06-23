import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type ThemeMode = "system" | "light" | "dark";

interface ThemeStore {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  loadThemeMode: () => Promise<void>;
}

const THEME_KEY = "theme_mode";

export const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: "system",
  setThemeMode: async (mode) => {
    set({ themeMode: mode });
    await AsyncStorage.setItem(THEME_KEY, mode);
  },
  loadThemeMode: async () => {
    const saved = await AsyncStorage.getItem(THEME_KEY);
    if (saved) set({ themeMode: saved as ThemeMode });
  },
}));
