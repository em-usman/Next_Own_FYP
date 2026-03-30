import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

import { APP_TABS } from "@/constants/tabs";
import { Colors, Spacing } from "@/constants/theme";

// `TabTrigger` passes `href` down to `Pressable` on web, so the underlying DOM element can
// get the browser's default focus/tap highlight (often seen as a "mystery" colored flash).
// We explicitly reset it for our tab buttons to avoid the green blink.
const WEB_PRESSABLE_RESET = {
  outlineStyle: "none",
  outlineWidth: 0,
  boxShadow: "none",
  WebkitTapHighlightColor: "transparent",
} as any;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: "100%" }} />
      <TabList asChild>
        <CustomTabList>
          {APP_TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton
                defaultIconName={tab.icon.default}
                selectedIconName={tab.icon.selected}
                isSell={tab.name === "sell"}
              >
                {tab.label}
              </TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  children: React.ReactNode;
  defaultIconName: string;
  selectedIconName?: string;
  isSell?: boolean;
};

export function TabButton({
  children,
  defaultIconName,
  selectedIconName,
  isSell = false,
  isFocused,
  ...props
}: TabButtonProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const iconName =
    isFocused && selectedIconName ? selectedIconName : defaultIconName;

  // Special center Sell button
  if (isSell) {
    return (
      <Pressable
        {...props}
        style={({ pressed }) => [
          WEB_PRESSABLE_RESET,
          styles.sellPressable,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.sellWrapper}>
          <View style={[styles.sellButton, { backgroundColor: colors.black }]}>
            <Ionicons name="add" size={28} color={colors.white} />
          </View>
          <ThemedText
            type="small"
            themeColor={isFocused ? "tabActive" : "textSecondary"}
            style={styles.sellLabel}
          >
            {children}
          </ThemedText>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        WEB_PRESSABLE_RESET,
        styles.tabPressable,
        pressed && styles.pressed,
      ]}
    >
      <ThemedView
        type={isFocused ? "backgroundSelected" : "backgroundElement"}
        style={[
          styles.tabButtonView,
          isFocused && { borderBottomColor: colors.tabActive },
        ]}
      >
        <Ionicons
          name={iconName as any}
          size={18}
          color={isFocused ? colors.tabActive : colors.textSecondary}
        />
        <ThemedText
          type="small"
          themeColor={isFocused ? "tabActive" : "textSecondary"}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <View
      {...props}
      nativeID={props.nativeID ?? "app-tabs-tablist"}
      style={[
        WEB_PRESSABLE_RESET,
        styles.tabListContainer,
        { backgroundColor: colors.background, borderTopColor: colors.border },
      ]}
    >
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 24,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabPressable: {
    backgroundColor: "transparent",
    borderRadius: Spacing.two,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    borderRadius: Spacing.two,
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.one,
    minWidth: 56,
  },
  sellWrapper: {
    alignItems: "center",
    gap: Spacing.one,
    marginBottom: 4,
  },
  sellPressable: {
    backgroundColor: "transparent",
    borderRadius: 9999,
  },
  sellButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  sellLabel: {
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
