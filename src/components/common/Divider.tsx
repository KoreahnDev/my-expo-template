import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  label?: string;
  style?: ViewStyle;
}

export default function Divider({ label, style }: Props) {
  const { colors } = useTheme();

  if (label) {
    return (
      <View style={[styles.row, style]}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <Text style={[styles.label, { color: colors.textTertiary }]}>
          {label}
        </Text>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>
    );
  }

  return (
    <View style={[styles.line, { backgroundColor: colors.border }, style]} />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  line: {
    flex: 1,
    height: 0.5,
  },
  label: {
    fontSize: FontSize.sm,
  },
});
