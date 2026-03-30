import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme } from "react-native";

import { APP_TABS } from "@/constants/tabs";
import { Colors } from "@/constants/theme";

function getReadableTextColor(backgroundHex: string) {
  const sanitized = backgroundHex.replace("#", "");
  if (sanitized.length !== 6) return "#FFFFFF";
  const red = Number.parseInt(sanitized.slice(0, 2), 16);
  const green = Number.parseInt(sanitized.slice(2, 4), 16);
  const blue = Number.parseInt(sanitized.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness >= 140 ? "#141414" : "#FFFFFF";
}

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const activeContentColor = getReadableTextColor(colors.tabActive);

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.tabActive}
      labelVisibilityMode="labeled"
      iconColor={{
        default: colors.textSecondary,
        selected: activeContentColor,
      }}
      labelStyle={{
        default: { color: colors.textSecondary },
        selected: { color: colors.tabActive },
      }}
    >
      {APP_TABS.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={{
              default: (
                <NativeTabs.Trigger.VectorIcon
                  family={Ionicons}
                  name={tab.icon.default}
                />
              ),
              selected: (
                <NativeTabs.Trigger.VectorIcon
                  family={Ionicons}
                  name={tab.icon.selected}
                />
              ),
            }}
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
