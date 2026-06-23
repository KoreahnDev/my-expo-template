import { FontSize, FontWeight } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

type Variant = "h1" | "h2" | "h3" | "body" | "secondary" | "caption" | "code";

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  style?: TextStyle;
  numberOfLines?: number;
}

export default function Text({
  children,
  variant = "body",
  style,
  numberOfLines,
}: Props) {
  const { colors } = useTheme();

  const variantStyle: TextStyle = {
    ...styles[variant],
    color: ["secondary", "caption"].includes(variant)
      ? colors.textSecondary
      : variant === "code"
        ? colors.textSecondary
        : colors.text,
  };

  return (
    <RNText style={[variantStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: FontSize.xxl, fontWeight: FontWeight.medium, lineHeight: 34 },
  h2: { fontSize: FontSize.xl, fontWeight: FontWeight.medium, lineHeight: 28 },
  h3: { fontSize: FontSize.lg, fontWeight: FontWeight.medium, lineHeight: 24 },
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: 26,
  },
  secondary: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: 22,
  },
  caption: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: 18,
  },
  code: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    fontFamily: "monospace",
  },
});
