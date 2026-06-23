import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  containerStyle,
  style,
  ...rest
}: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundElement,
            color: colors.text,
            borderColor: error ? "#E24B4A" : colors.border,
          },
          style,
        ]}
        placeholderTextColor={colors.textTertiary}
        keyboardAppearance={isDark ? "dark" : "light"}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "500",
  },
  input: {
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 0.5,
    paddingHorizontal: Spacing.three,
    fontSize: FontSize.md,
  },
  error: {
    fontSize: FontSize.xs,
    color: "#E24B4A",
  },
});
