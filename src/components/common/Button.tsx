import {
  BrandColors,
  FontSize,
  FontWeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import { ThemeColors, useTheme } from "@/hooks/useTheme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
}: Props) {
  const { colors, isDark } = useTheme();
  const primaryColor = isDark
    ? BrandColors.primary.dark
    : BrandColors.primary.light;
  const primaryTextColor = isDark
    ? BrandColors.primary.light
    : BrandColors.primary.dark;
  const isDisabled = disabled || loading;
  const vStyles = variantStyles(variant, colors, isDark);

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[size],
        fullWidth && styles.fullWidth,
        vStyles.container,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary"
              ? primaryTextColor
              : variant === "danger"
                ? "#fff"
                : primaryColor
          }
        />
      ) : (
        <Text style={[styles.text, textSizeStyles[size], vStyles.text]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function variantStyles(variant: Variant, colors: ThemeColors, isDark: boolean) {
  const primary = isDark ? BrandColors.primary.dark : BrandColors.primary.light;
  const primaryText = isDark
    ? BrandColors.primary.light
    : BrandColors.primary.dark;
  const accent = isDark ? BrandColors.accent.dark : BrandColors.accent.light;

  switch (variant) {
    case "primary":
      return {
        container: { backgroundColor: primary, borderWidth: 0 } as ViewStyle,
        text: { color: primaryText } as TextStyle,
      };
    case "secondary":
      return {
        container: {
          backgroundColor: colors.backgroundElement,
          borderWidth: 0,
        } as ViewStyle,
        text: { color: colors.text } as TextStyle,
      };
    case "outline":
      return {
        container: {
          backgroundColor: "transparent",
          borderWidth: 0.5,
          borderColor: colors.borderStrong,
        } as ViewStyle,
        text: { color: colors.text } as TextStyle,
      };
    case "danger":
      return {
        container: {
          backgroundColor: BrandColors.danger,
          borderWidth: 0,
        } as ViewStyle,
        text: { color: "#FFFFFF" } as TextStyle,
      };
  }
}

const textSizeStyles: Record<Size, TextStyle> = {
  sm: { fontSize: FontSize.sm },
  md: { fontSize: FontSize.md },
  lg: { fontSize: FontSize.base },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    minHeight: 32,
  },
  md: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    minHeight: 44,
  },
  lg: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    minHeight: 52,
  },
  fullWidth: { width: "100%" },
  disabled: { opacity: 0.5 },
  text: { fontWeight: FontWeight.medium },
});
