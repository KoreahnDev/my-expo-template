import { AvatarColors, FontWeight, Radius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

type AvatarSize = "sm" | "md" | "lg";

interface Props {
  uri?: string | null;
  name?: string | null;
  size?: AvatarSize;
  showStatus?: boolean;
  online?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { container: 28, fontSize: 11, statusSize: 8 },
  md: { container: 44, fontSize: 15, statusSize: 10 },
  lg: { container: 64, fontSize: 22, statusSize: 14 },
};

function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

function getColorIndex(name: string, length: number): number {
  if (!name || name.trim().length === 0) return 0;
  let code = 0;
  for (let i = 0; i < name.trim().length; i++) {
    code += name.trim().charCodeAt(i);
  }
  return code % length;
}

export default function Avatar({
  uri,
  name,
  size = "md",
  showStatus = false,
  online = false,
  style,
}: Props) {
  const { isDark } = useTheme();
  const config = sizeConfig[size];
  const colorSet = isDark ? AvatarColors.dark : AvatarColors.light;
  const colorIndex = getColorIndex(name ?? "", colorSet.length);
  const color = colorSet[colorIndex];
  const initials = getInitials(name ?? "");

  return (
    <View
      style={[{ width: config.container, height: config.container }, style]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: config.container, height: config.container },
          ]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: config.container,
              height: config.container,
              backgroundColor: color.background,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              { fontSize: config.fontSize, color: color.color },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}
      {showStatus && (
        <View
          style={[
            styles.status,
            {
              width: config.statusSize,
              height: config.statusSize,
              backgroundColor: online ? "#1D9E75" : "#888780",
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: Radius.full,
  },
  initialsContainer: {
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontWeight: FontWeight.medium,
  },
  status: {
    position: "absolute",
    bottom: 1,
    right: 1,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
