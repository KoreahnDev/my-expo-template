import { signOut } from "@/api/auth";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import Input from "@/components/common/Input";
import Screen from "@/components/common/Screen";
import Text from "@/components/common/Text";
import { BrandColors, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore, useLoadingStore, useThemeStore } from "@/store";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const profile = useAuthStore((s) => s.profile);
  const { themeMode, setThemeMode } = useThemeStore();
  const { show, hide } = useLoadingStore();
  const { colors, isDark } = useTheme();
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSignOut = async () => {
    try {
      show("로그아웃 중...");
      await signOut();
    } catch (error) {
      Alert.alert("오류", "로그아웃에 실패했습니다.");
    } finally {
      hide();
    }
  };

  const handleInputValidation = () => {
    if (!inputValue3) {
      setInputError("값을 입력해주세요.");
    } else {
      setInputError("");
      Alert.alert("확인", `입력값: ${inputValue3}`);
    }
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* 프로필 */}
          <View
            style={[
              styles.section,
              {
                backgroundColor: colors.backgroundElement,
                borderRadius: Radius.lg,
              },
            ]}
          >
            <Text variant="h3">프로필</Text>
            <Divider />
            <View style={styles.row}>
              <Text variant="secondary">이름</Text>
              <Text>{profile?.full_name ?? "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text variant="secondary">이메일</Text>
              <Text>{profile?.email ?? "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text variant="secondary">로그인</Text>
              <Text>{profile?.provider ?? "-"}</Text>
            </View>
          </View>

          {/* 타이포그래피 */}
          <View style={styles.section}>
            <Text variant="h3">타이포그래피</Text>
            <Divider />
            <Text variant="h1">H1 타이틀</Text>
            <Text variant="h2">H2 섹션 제목</Text>
            <Text variant="h3">H3 서브 제목</Text>
            <Text variant="body">
              Body 본문 텍스트예요. 읽기 편한 크기와 행간으로 설정되어 있어요.
            </Text>
            <Text variant="secondary">Secondary 부가 설명 텍스트</Text>
            <Text variant="caption">Caption 캡션, 힌트 텍스트</Text>
            <Text variant="code">const hello = 'world'</Text>
          </View>

          {/* 버튼 */}
          <View style={styles.section}>
            <Text variant="h3">버튼</Text>
            <Divider />
            <Button
              label="Primary 버튼"
              onPress={() => Alert.alert("Primary")}
              variant="primary"
            />
            <Button
              label="Secondary 버튼"
              onPress={() => Alert.alert("Secondary")}
              variant="secondary"
            />
            <Button
              label="Outline 버튼"
              onPress={() => Alert.alert("Outline")}
              variant="outline"
            />
            <Button
              label="Danger 버튼"
              onPress={() => Alert.alert("Danger")}
              variant="danger"
            />
            <View style={styles.row}>
              <Button
                label="Small"
                onPress={() => {}}
                variant="primary"
                size="sm"
              />
              <Button
                label="Medium"
                onPress={() => {}}
                variant="primary"
                size="md"
              />
              <Button
                label="Large"
                onPress={() => {}}
                variant="primary"
                size="lg"
              />
            </View>
            <Button
              label="로딩 중..."
              onPress={() => {}}
              variant="primary"
              loading
            />
            <Button
              label="비활성화"
              onPress={() => {}}
              variant="primary"
              disabled
            />
          </View>

          {/* 인풋 */}
          <View style={styles.section}>
            <Text variant="h3">인풋</Text>
            <Divider />
            <Text variant="caption">라벨 없음</Text>
            <Input
              placeholder="라벨 없는 인풋"
              value={inputValue1}
              onChangeText={setInputValue1}
            />
            <Text variant="caption">라벨 있음</Text>
            <Input
              label="이름"
              placeholder="홍길동"
              value={inputValue2}
              onChangeText={setInputValue2}
            />
            <Text variant="caption">에러 상태</Text>
            <Input
              label="이메일"
              placeholder="hello@example.com"
              value={inputValue3}
              onChangeText={(text) => {
                setInputValue3(text);
                setInputError("");
              }}
              error={inputError}
            />
            <Button
              label="유효성 검사"
              onPress={handleInputValidation}
              variant="outline"
            />
          </View>

          {/* 구분선 */}
          <View style={styles.section}>
            <Text variant="h3">구분선</Text>
            <Divider />
            <Divider label="또는" />
          </View>

          {/* 색상 */}
          <View style={styles.section}>
            <Text variant="h3">색상</Text>
            <Divider />
            <View style={styles.colorRow}>
              {[
                {
                  label: "Primary",
                  color: isDark
                    ? BrandColors.primary.dark
                    : BrandColors.primary.light,
                },
                {
                  label: "Accent",
                  color: isDark
                    ? BrandColors.accent.dark
                    : BrandColors.accent.light,
                },
                { label: "Danger", color: BrandColors.danger },
                {
                  label: "Success",
                  color: isDark
                    ? BrandColors.success.dark
                    : BrandColors.success.light,
                },
                {
                  label: "Warning",
                  color: isDark
                    ? BrandColors.warning.dark
                    : BrandColors.warning.light,
                },
              ].map((item) => (
                <View key={item.label} style={styles.colorItem}>
                  <View
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text variant="caption">{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 테마 */}
          <View style={styles.section}>
            <Text variant="h3">테마</Text>
            <Divider />
            <View style={styles.row}>
              <Button
                label="라이트"
                onPress={() => setThemeMode("light")}
                variant={themeMode === "light" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label="시스템"
                onPress={() => setThemeMode("system")}
                variant={themeMode === "system" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label="다크"
                onPress={() => setThemeMode("dark")}
                variant={themeMode === "dark" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </View>

          {/* 로그아웃 */}
          <Button
            label="로그아웃"
            onPress={handleSignOut}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  section: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.two,
  },
  colorRow: {
    flexDirection: "row",
    gap: Spacing.three,
    flexWrap: "wrap",
  },
  colorItem: {
    alignItems: "center",
    gap: Spacing.one,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
  },
});
