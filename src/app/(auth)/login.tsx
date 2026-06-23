import { signInWithGoogle, signInWithKakao } from "@/api/auth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Divider from "@/components/common/Divider";
import Screen from "@/components/common/Screen";
import Text from "@/components/common/Text";
import { useLoadingStore } from "@/store";
import { Alert, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const { show, hide } = useLoadingStore();

  const handleGoogleLogin = async () => {
    try {
      show("로그인 중...");
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("오류", "Google 로그인에 실패했습니다.");
    } finally {
      hide();
    }
  };

  const handleKakaoLogin = async () => {
    try {
      show("로그인 중...");
      await signInWithKakao();
    } catch (error) {
      Alert.alert("오류", "카카오 로그인에 실패했습니다.");
    } finally {
      hide();
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1">시작하기</Text>
          <Text variant="secondary">소셜 계정으로 간편하게 로그인하세요</Text>
        </View>
        <View style={styles.buttons}>
          <GoogleLoginButton onPress={handleGoogleLogin} />
          <Divider label="또는" />
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
