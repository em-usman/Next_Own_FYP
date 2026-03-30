import "@/global.css";
import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#141414",
    textSecondary: "#141414CC",
    textMuted: "#14141488",
    textInverse: "#FFFFFF",

    background: "#FFFFFF",
    backgroundHeader: "#000000",
    backgroundElement: "#FFFFFF",
    backgroundSelected: "#7BF7CF33",

    primary: "#03BABB",
    primaryForeground: "#FFFFFF",

    border: "#14141422",
    borderStrong: "#14141444",
    borderError: "#FF5E77",

    error: "#FF3B59",
    errorBackground: "#FF5E7722",

    divider: "#14141422",

    icon: "#141414CC",
    black: "#000000",
    white: "#FFFFFF",

    tabActive: "#03BABB",
  },

  dark: {
    text: "#FFFFFF",
    textSecondary: "#FFFFFFCC",
    textMuted: "#7BF7CF",
    textInverse: "#141414",

    background: "#141414",
    backgroundHeader: "#000000",
    backgroundElement: "#000000",
    backgroundSelected: "#03BABB22",

    primary: "#7BF7CF",
    primaryForeground: "#141414",

    border: "#FFFFFF26",
    borderStrong: "#FFFFFF40",
    borderError: "#FF5E77",

    error: "#FF5E77",
    errorBackground: "#FF3B5926",

    divider: "#FFFFFF22",

    icon: "#7BF7CF",
    black: "#000000",
    white: "#FFFFFF",

    tabActive: "#7BF7CF",
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
