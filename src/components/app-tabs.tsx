import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme } from "react-native";

import { APP_TABS } from "@/constants/tabs";
import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      iconColor={{ default: colors.textSecondary, selected: colors.text }}
      labelStyle={{ selected: { color: colors.text } }}
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
