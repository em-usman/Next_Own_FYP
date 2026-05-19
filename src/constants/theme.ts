import "@/global.css";
import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#0D1B2A",
    textSecondary: "#4D6575",
    textMuted: "#8FA3B3",
    textInverse: "#FFFFFF",

    background: "#FFFFFF",
    backgroundHeader: "#0D1B2A",
    backgroundElement: "#F5FAFB",
    backgroundSelected: "rgba(0,153,168,0.08)",

    primary: "#0099A8",
    primaryForeground: "#FFFFFF",

    border: "#DDE8ED",
    borderStrong: "#B8CED8",
    borderError: "#EF4444",

    error: "#EF4444",
    errorBackground: "rgba(239,68,68,0.08)",

    divider: "#EEF4F7",

    icon: "#4D6575",
    black: "#0D1B2A",
    white: "#FFFFFF",

    tabActive: "#0099A8",
  },

  dark: {
    text: "#EDF4FA",
    textSecondary: "#7A94AC",
    textMuted: "#3D5A72",
    textInverse: "#0A1628",

    background: "#0A1628",
    backgroundHeader: "#060F1E",
    backgroundElement: "#112236",
    backgroundSelected: "rgba(0,207,216,0.1)",

    primary: "#00CFD8",
    primaryForeground: "#0A1628",

    border: "#1A2F45",
    borderStrong: "#2A4560",
    borderError: "#EF4444",

    error: "#FF6B6B",
    errorBackground: "rgba(255,107,107,0.12)",

    divider: "#122033",

    icon: "#7A94AC",
    black: "#0A1628",
    white: "#EDF4FA",

    tabActive: "#00CFD8",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

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
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
