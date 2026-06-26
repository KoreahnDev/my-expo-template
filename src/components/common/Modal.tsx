import {
  BrandColors,
  FontSize,
  FontWeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import {
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ConfirmVariant = "primary" | "danger";

interface Props {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  confirmVariant?: ConfirmVariant;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function Modal({
  visible,
  title,
  message,
  confirmLabel = "확인",
  confirmVariant = "primary",
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  const { colors, isDark } = useTheme();

  const confirmColor =
    confirmVariant === "danger"
      ? BrandColors.danger
      : isDark
        ? BrandColors.primary.dark
        : BrandColors.primary.light;

  const confirmTextColor =
    confirmVariant === "danger"
      ? "#FFFFFF"
      : isDark
        ? BrandColors.primary.light
        : BrandColors.primary.dark;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel ?? onConfirm}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onCancel ?? onConfirm}
        />
        <View
          style={[
            styles.container,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {message && (
              <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
              </Text>
            )}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.actions}>
            {cancelLabel && onCancel && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onCancel}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.buttonText, { color: colors.textSecondary }]}
                  >
                    {cancelLabel}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.verticalDivider,
                    { backgroundColor: colors.border },
                  ]}
                />
              </>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: confirmColor, fontWeight: FontWeight.medium },
                ]}
              >
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    width: 280,
    borderRadius: Radius.lg,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  content: {
    padding: Spacing.four,
    alignItems: "center",
    gap: Spacing.one,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    textAlign: "center",
  },
  message: {
    fontSize: FontSize.sm,
    textAlign: "center",
    lineHeight: 20,
  },
  divider: {
    height: 0.5,
  },
  actions: {
    flexDirection: "row",
    minHeight: 44,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.three,
  },
  buttonText: {
    fontSize: FontSize.base,
  },
  verticalDivider: {
    width: 0.5,
  },
});
