import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function KakaoIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        fill="#1A1A1A"
        d="M12 3C6.48 3 2 6.48 2 10.8c0 2.7 1.7 5.1 4.3 6.5l-1.1 4 4.7-2.8c.7.1 1.4.2 2.1.2 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"
      />
    </Svg>
  );
}

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

export default function KakaoLoginButton({ onPress, disabled }: Props) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <KakaoIcon />
        <Text style={styles.text}>{t("auth.kakaoLogin")}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    borderRadius: Radius.full,
    backgroundColor: "#FEE500",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: "#1A1A1A",
  },
  disabled: {
    opacity: 0.5,
  },
});
