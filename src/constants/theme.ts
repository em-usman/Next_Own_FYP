import "@/global.css";
import { Platform } from "react-native";

export const Colors = {
  light: {
    // Base
    text: "#111827", // gray-900
    textSecondary: "#6B7280", // gray-500
    textMuted: "#9CA3AF", // gray-400
    textInverse: "#FFFFFF", // white text on dark bg

    // Backgrounds
    background: "#FFFFFF", // main screen bg
    backgroundHeader: "#000000", // top black header
    backgroundElement: "#F9FAFB", // gray-50 — inputs, buttons
    backgroundSelected: "#E5E7EB", // gray-200 — dividers, pressed

    // Primary / Accent
    primary: "#2563EB", // blue-600
    primaryForeground: "#FFFFFF", // text on primary

    // Borders
    border: "#E5E7EB", // gray-200 — default borders
    borderStrong: "#D1D5DB", // gray-300 — checkbox border
    borderError: "#F87171", // red-400 — error field border

    // Error
    error: "#EF4444", // red-500
    errorBackground: "#FEE2E2",

    // Divider
    divider: "#E5E7EB", // gray-200

    // Misc
    icon: "#60646C", // icon color used in inputs
    black: "#000000",
    white: "#FFFFFF",

    tabActive: "#2563EB",
  },

  dark: {
    // Base
    text: "#F9FAFB", // near white
    textSecondary: "#9CA3AF", // muted
    textMuted: "#6B7280",
    textInverse: "#FFFFFF", // dark text on light surface

    // Backgrounds
    background: "#111827", // dark screen bg
    backgroundHeader: "#000000", // keep header pure black
    backgroundElement: "#1F2937", // elevated surfaces, inputs
    backgroundSelected: "#374151", // pressed/selected

    // Primary / Accent
    primary: "#60A5FA", // blue-400 — readable on dark
    primaryForeground: "#FFFFFF",

    // Borders
    border: "#374151", // gray-700
    borderStrong: "#4B5563", // gray-600
    borderError: "#F87171", // red-400 stays same

    // Error
    error: "#FCA5A5", // red-300 — softer on dark
    errorBackground: "#7F1D1D",

    // Divider
    divider: "#374151",

    // Misc
    icon: "#9CA3AF",
    black: "#000000",
    white: "#FFFFFF",

    tabActive: "#60A5FA",
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
