import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  safe?: boolean;
}

export default function Screen({
  children,
  style,
  padded = true,
  safe = true,
}: Props) {
  const { colors } = useTheme();

  const content = (
    <View style={[styles.inner, padded && styles.padded, style]}>
      {children}
    </View>
  );

  if (safe) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1 },
  padded: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
