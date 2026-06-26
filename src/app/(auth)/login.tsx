import { signInWithGoogle, signInWithKakao } from "@/api/auth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Divider from "@/components/common/Divider";
import Screen from "@/components/common/Screen";
import Text from "@/components/common/Text";
import { useTranslation } from "@/hooks/useTranslation";
import { useLoadingStore } from "@/store";
import { Alert, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const { show, hide } = useLoadingStore();
  const { t } = useTranslation();

  const handleGoogleLogin = async () => {
    try {
      show(t("auth.loggingIn"));
      await signInWithGoogle();
    } catch (error) {
      Alert.alert(t("auth.error"), t("auth.loginFailed"));
    } finally {
      hide();
    }
  };

  const handleKakaoLogin = async () => {
    try {
      show(t("auth.loggingIn"));
      await signInWithKakao();
    } catch (error) {
      Alert.alert(t("auth.error"), t("auth.loginFailed"));
    } finally {
      hide();
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1">{t("auth.title")}</Text>
          <Text variant="secondary">{t("auth.subtitle")}</Text>
        </View>
        <View style={styles.buttons}>
          <GoogleLoginButton onPress={handleGoogleLogin} />
          <Divider label={t("auth.or")} />
          <KakaoLoginButton onPress={handleKakaoLogin} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 48,
  },
  header: {
    gap: 8,
    alignItems: "center",
  },
  buttons: {
    gap: 16,
    paddingHorizontal: 24,
  },
});
