import { signOut } from "@/api/auth";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import EmptyState from "@/components/common/EmptyState";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Screen from "@/components/common/Screen";
import Text from "@/components/common/Text";
import { BrandColors, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useAuthStore,
  useLanguageStore,
  useLoadingStore,
  useThemeStore,
  useToastStore,
} from "@/store";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const profile = useAuthStore((s) => s.profile);
  const { show: showLoading, hide: hideLoading } = useLoadingStore();
  const { colors, isDark } = useTheme();
  const { themeMode, setThemeMode } = useThemeStore();
  const { setLanguage, language } = useLanguageStore();
  const { show: showToast } = useToastStore();
  const { t } = useTranslation();

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputError, setInputError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      showLoading(t("auth.loggingOut"));
      await signOut();
    } catch (error) {
      showToast({
        type: "error",
        title: t("auth.error"),
        message: t("auth.logoutFailed"),
      });
    } finally {
      hideLoading();
    }
  };

  const handleInputValidation = () => {
    if (!inputValue3) {
      setInputError(t("home.inputErrorMessage"));
    } else {
      setInputError("");
      Alert.alert(
        t("home.inputConfirm"),
        t("home.inputConfirmMessage") + inputValue3,
      );
    }
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* 프로필 */}
          <Card>
            <Text variant="h3">{t("home.profile")}</Text>
            <Divider />
            <View style={styles.row}>
              <Text variant="secondary">{t("home.name")}</Text>
              <View style={styles.rowRight}>
                <Avatar name={profile?.full_name ?? "?"} size="sm" />
                <Text>{profile?.full_name ?? "-"}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text variant="secondary">{t("home.email")}</Text>
              <Text>{profile?.email ?? "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text variant="secondary">{t("home.loginProvider")}</Text>
              <Badge
                label={profile?.provider ?? "-"}
                type={
                  profile?.provider === "google"
                    ? "info"
                    : profile?.provider === "kakao"
                      ? "warning"
                      : "neutral"
                }
              />
            </View>
          </Card>

          {/* 타이포그래피 */}
          <Card>
            <Text variant="h3">{t("home.typography")}</Text>
            <Divider />
            <Text variant="h1">H1 {t("home.typography")}</Text>
            <Text variant="h2">H2 {t("home.typography")}</Text>
            <Text variant="h3">H3 {t("home.typography")}</Text>
            <Text variant="body">Body — {t("home.typographyBody")}</Text>
            <Text variant="secondary">
              Secondary — {t("home.typographySecondary")}
            </Text>
            <Text variant="caption">
              Caption — {t("home.typographyCaption")}
            </Text>
            <Text variant="code">const hello = 'world'</Text>
          </Card>

          {/* 버튼 */}
          <Card>
            <Text variant="h3">{t("home.button")}</Text>
            <Divider />
            <Button
              label={`Primary ${t("home.button")}`}
              onPress={() => {}}
              variant="primary"
            />
            <Button
              label={`Secondary ${t("home.button")}`}
              onPress={() => {}}
              variant="secondary"
            />
            <Button
              label={`Outline ${t("home.button")}`}
              onPress={() => {}}
              variant="outline"
            />
            <Button
              label={`Danger ${t("home.button")}`}
              onPress={() => {}}
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
              label={t("home.loading")}
              onPress={() => {}}
              variant="primary"
              loading
            />
            <Button
              label={t("home.disabled")}
              onPress={() => {}}
              variant="primary"
              disabled
            />
          </Card>

          {/* 인풋 */}
          <Card>
            <Text variant="h3">{t("home.input")}</Text>
            <Divider />
            <Text variant="caption">{t("home.inputNoLabel")}</Text>
            <Input
              placeholder={t("home.inputPlaceholder")}
              value={inputValue1}
              onChangeText={setInputValue1}
            />
            <Text variant="caption">{t("home.inputWithLabel")}</Text>
            <Input
              label={t("home.name")}
              placeholder={t("home.namePlaceholder")}
              value={inputValue2}
              onChangeText={setInputValue2}
            />
            <Text variant="caption">{t("home.inputError")}</Text>
            <Input
              label={t("home.email")}
              placeholder={t("home.emailPlaceholder")}
              value={inputValue3}
              onChangeText={(text) => {
                setInputValue3(text);
                setInputError("");
              }}
              error={inputError}
            />
            <Button
              label={t("home.inputValidate")}
              onPress={handleInputValidation}
              variant="outline"
            />
          </Card>

          {/* 구분선 */}
          <Card>
            <Text variant="h3">{t("home.divider")}</Text>
            <Divider />
            <Divider label={t("auth.or")} />
          </Card>

          {/* 색상 */}
          <Card>
            <Text variant="h3">{t("home.color")}</Text>
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
          </Card>

          {/* 뱃지 */}
          <Card>
            <Text variant="h3">{t("home.badge")}</Text>
            <Divider />
            <View style={styles.badgeRow}>
              <Badge label="완료" type="success" />
              <Badge label="오류" type="error" />
              <Badge label="주의" type="warning" />
              <Badge label="정보" type="info" />
              <Badge label="기본" type="neutral" />
            </View>
            <View style={[styles.badgeRow, { marginTop: Spacing.two }]}>
              <Badge variant="dot" type="error" count={3} />
              <Badge variant="dot" type="info" count={12} />
              <Badge variant="dot" type="success" count={99} />
              <Badge variant="dot" type="warning" count={100} />
            </View>
          </Card>

          {/* 아바타 */}
          <Card>
            <Text variant="h3">{t("home.avatar")}</Text>
            <Divider />
            <View style={styles.avatarRow}>
              <Avatar name="홍길동" size="lg" showStatus online />
              <Avatar name="Kim Min" size="md" showStatus />
              <Avatar name="Lee Junho" size="md" />
              <Avatar name="홍길동" size="sm" />
            </View>
          </Card>

          {/* 빈 상태 */}
          <Card>
            <Text variant="h3">{t("home.emptyState")}</Text>
            <Divider />
            <EmptyState
              icon="📭"
              title={t("home.emptyTitle")}
              message={t("home.emptyMessage")}
              actionLabel={t("home.emptyAction")}
              onAction={() =>
                showToast({ type: "info", title: "추가하기 클릭!" })
              }
            />
          </Card>

          {/* 모달 */}
          <Card>
            <Text variant="h3">{t("home.modal")}</Text>
            <Divider />
            <View style={styles.row}>
              <Button
                label={t("home.alertShow")}
                onPress={() => setAlertVisible(true)}
                variant="outline"
                style={{ flex: 1 }}
              />
              <Button
                label={t("home.dialogShow")}
                onPress={() => setModalVisible(true)}
                variant="outline"
                style={{ flex: 1 }}
              />
            </View>
          </Card>

          {/* 토스트 */}
          <Card>
            <Text variant="h3">{t("home.toast")}</Text>
            <Divider />
            <View style={styles.row}>
              <Button
                label="Success"
                onPress={() =>
                  showToast({
                    type: "success",
                    title: "저장되었습니다",
                    message: "변경사항이 저장되었어요.",
                  })
                }
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label="Error"
                onPress={() =>
                  showToast({
                    type: "error",
                    title: "오류",
                    message: "잠시 후 다시 시도해주세요.",
                  })
                }
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
            <View style={styles.row}>
              <Button
                label="Warning"
                onPress={() =>
                  showToast({
                    type: "warning",
                    title: "주의",
                    message: "네트워크를 확인해주세요.",
                  })
                }
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label="Info"
                onPress={() =>
                  showToast({
                    type: "info",
                    title: "안내",
                    message: "새로운 업데이트가 있어요.",
                  })
                }
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </Card>

          {/* 테마 */}
          <Card>
            <Text variant="h3">{t("home.theme")}</Text>
            <Divider />
            <View style={styles.row}>
              <Button
                label={t("home.themeLight")}
                onPress={() => setThemeMode("light")}
                variant={themeMode === "light" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label={t("home.themeSystem")}
                onPress={() => setThemeMode("system")}
                variant={themeMode === "system" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label={t("home.themeDark")}
                onPress={() => setThemeMode("dark")}
                variant={themeMode === "dark" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </Card>

          {/* 언어 */}
          <Card>
            <Text variant="h3">{t("home.language")}</Text>
            <Divider />
            <View style={styles.row}>
              <Button
                label="한국어"
                onPress={() => setLanguage("ko")}
                variant={language === "ko" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
              <Button
                label="English"
                onPress={() => setLanguage("en")}
                variant={language === "en" ? "primary" : "outline"}
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </Card>

          {/* 로그아웃 */}
          <Button
            label={t("home.logout")}
            onPress={handleSignOut}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>

      {/* 모달 */}
      <Modal
        visible={alertVisible}
        title={t("home.alertTitle")}
        message={t("home.alertMessage")}
        confirmLabel={t("home.confirm")}
        onConfirm={() => setAlertVisible(false)}
      />
      <Modal
        visible={modalVisible}
        title={t("home.dialogTitle")}
        message={t("home.dialogMessage")}
        confirmLabel={t("home.delete")}
        confirmVariant="danger"
        cancelLabel={t("home.cancel")}
        onConfirm={() => {
          setModalVisible(false);
          showToast({ type: "success", title: "삭제되었습니다." });
        }}
        onCancel={() => setModalVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.two,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
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
  badgeRow: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    gap: Spacing.three,
    alignItems: "center",
  },
});
