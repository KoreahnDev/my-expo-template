import { BrandColors, FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useLoadingStore } from "@/store";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function LoadingOverlay() {
  const { isLoading, message } = useLoadingStore();
  const { colors, isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isLoading ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, borderColor: colors.border },
        ]}
      >
        <SpinnerView isDark={isDark} />
        {message && (
          <Text style={[styles.message, { color: colors.textSecondary }]}>
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

function SpinnerView({ isDark }: { isDark: boolean }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const primaryColor = isDark
    ? BrandColors.primary.dark
    : BrandColors.primary.light;

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
          borderTopColor: primaryColor,
          transform: [{ rotate }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    padding: Spacing.four,
    borderRadius: Radius.lg,
    alignItems: "center",
    gap: Spacing.three,
    minWidth: 120,
    borderWidth: 0.5,
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 3,
  },
  message: {
    fontSize: FontSize.md,
    textAlign: "center",
  },
});
