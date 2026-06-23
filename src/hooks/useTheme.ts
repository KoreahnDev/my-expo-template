import { Colors } from "@/constants/theme";
import { useThemeStore } from "@/store";
import { useColorScheme } from "react-native";

export type ThemeColors = typeof Colors.light;

export const useTheme = () => {
  const systemColorScheme = useColorScheme() ?? "light";
  const { themeMode } = useThemeStore();

  const colorScheme = themeMode === "system" ? systemColorScheme : themeMode;
  const colors = Colors[colorScheme as "light" | "dark"];
  const isDark = colorScheme === "dark";

  return { colors, isDark, colorScheme };
};
