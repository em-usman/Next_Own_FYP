import { Platform, StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "smallBold"
    | "subtitle"
    | "heading"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color:
            type === "linkPrimary"
              ? theme.primary
              : theme[themeColor ?? "text"],
        },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "small" && styles.small,
        type === "smallBold" && styles.smallBold,
        type === "subtitle" && styles.subtitle,
        type === "heading" && styles.heading,
        type === "link" && styles.link,
        type === "linkPrimary" && styles.linkPrimary,
        type === "code" && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "400",
  },
  smallBold: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  default: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  heading: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  link: {
    lineHeight: 22,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: "600",
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: "700" }) ?? "500",
    fontSize: 12,
  },
});
