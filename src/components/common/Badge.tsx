import { FontSize, FontWeight, Radius } from "@/constants/theme";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type BadgeType = "success" | "error" | "warning" | "info" | "neutral";
type BadgeVariant = "text" | "dot";

interface Props {
  label?: string;
  type?: BadgeType;
  variant?: BadgeVariant;
  count?: number;
  style?: ViewStyle;
}

const badgeConfig = {
  success: { background: "#EAF3DE", color: "#3B6D11" },
  error: { background: "#FCEBEB", color: "#A32D2D" },
  warning: { background: "#FAEEDA", color: "#854F0B" },
  info: { background: "#E6F1FB", color: "#185FA5" },
  neutral: { background: "#E8E7E0", color: "#444441" },
};

export default function Badge({
  label,
  type = "neutral",
  variant = "text",
  count,
  style,
}: Props) {
  const config = badgeConfig[type];

  if (variant === "dot") {
    return (
      <View style={[styles.dot, { backgroundColor: config.background }, style]}>
        <Text style={[styles.dotText, { color: config.color }]}>
          {count && count > 99 ? "99+" : count}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, { backgroundColor: config.background }, style]}>
      <Text style={[styles.text, { color: config.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  dot: {
    minWidth: 20,
    height: 20,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  dotText: {
    fontSize: 11,
    fontWeight: FontWeight.medium,
  },
});
