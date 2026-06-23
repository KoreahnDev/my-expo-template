import LoadingOverlay from "@/components/common/LoadingOverlay";
import { useAuth } from "@/hooks/useAuth";
import { useOTAUpdate } from "@/hooks/useOTAUpdate";
import { useThemeStore } from "@/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID!,
});

initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_APP_KEY!);

function RootLayoutNav() {
  useOTAUpdate();

  const { profile, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { loadThemeMode, themeMode } = useThemeStore();
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    loadThemeMode();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!profile && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (profile && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [profile, isLoading, segments]);

  const colorScheme = themeMode === "system" ? systemColorScheme : themeMode;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <LoadingOverlay />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <LoadingOverlay />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
