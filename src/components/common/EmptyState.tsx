import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, View, ViewStyle } from "react-native";
import Button from "./Button";
import Text from "./Text";

interface Props {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export default function EmptyState({
  icon = "📭",
  title,
  message,
  actionLabel,
  onAction,
  style,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.iconWrap, { backgroundColor: colors.backgroundElement }]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textWrap}>
        <Text variant="h3" style={styles.center}>
          {title}
        </Text>
        {message && (
          <Text variant="secondary" style={styles.center}>
            {message}
          </Text>
        )}
      </View>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} variant="primary" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.three,
    padding: Spacing.four,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
  },
  textWrap: {
    gap: Spacing.one,
    alignItems: "center",
  },
  center: {
    textAlign: "center",
  },
});
