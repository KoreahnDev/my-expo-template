import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1C1C1A",
    textSecondary: "#5F5E5A",
    textTertiary: "#888780",
    background: "#F0EFE8",
    backgroundSecondary: "#FFFFFF",
    backgroundElement: "#E8E7E0",
    backgroundSelected: "#DDDCD5",
    border: "rgba(0,0,0,0.08)",
    borderStrong: "rgba(0,0,0,0.25)",
  },
  dark: {
    text: "#F0EFE8",
    textSecondary: "#B4B2A9",
    textTertiary: "#5F5E5A",
    background: "#111110",
    backgroundSecondary: "#1C1C1A",
    backgroundElement: "#2C2C2A",
    backgroundSelected: "#3C3C3A",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.25)",
  },
};

export const BrandColors = {
  primary: {
    light: "#1C1C1A",
    dark: "#F0EFE8",
  },
  accent: {
    light: "#E8672A",
    dark: "#EF9F27",
  },
  danger: "#C0392B",
  success: {
    light: "#1A5C2E",
    dark: "#7ED89A",
  },
  warning: {
    light: "#7A4000",
    dark: "#F5C97A",
  },
  kakao: "#FEE500",
  kakaoText: "#1A1A1A",
} as const;

export const BadgeColors = {
  light: {
    success: { background: "#D4EDDA", text: "#1A5C2E", border: "#A8D5B5" },
    danger: { background: "#FAD7D7", text: "#8B1A1A", border: "#F0A8A8" },
    warning: { background: "#FDE9C3", text: "#7A4000", border: "#F5C97A" },
    neutral: { background: "#E8E7E0", text: "#444441", border: "#C8C7C0" },
  },
  dark: {
    success: { background: "#1A3D24", text: "#7ED89A", border: "#2E6B3E" },
    danger: { background: "#3D1A1A", text: "#F08080", border: "#6B2E2E" },
    warning: { background: "#3D2800", text: "#F5C97A", border: "#6B4400" },
    neutral: { background: "#2C2C2A", text: "#B4B2A9", border: "#444441" },
  },
} as const;

export const AvatarColors = {
  light: [
    { background: "#E6F1FB", color: "#185FA5" },
    { background: "#FAECE7", color: "#993C1D" },
    { background: "#EAF3DE", color: "#3B6D11" },
    { background: "#EEEDFE", color: "#3C3489" },
    { background: "#E1F5EE", color: "#0F6E56" },
  ],
  dark: [
    { background: "#0C447C", color: "#B5D4F4" },
    { background: "#712B13", color: "#F5C4B3" },
    { background: "#27500A", color: "#C0DD97" },
    { background: "#3C3489", color: "#CECBF6" },
    { background: "#085041", color: "#9FE1CB" },
  ],
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

export const FontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
