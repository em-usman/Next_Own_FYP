import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

const BUTTONS = [
  {
    id: "help",
    icon: {
      family: "material-community" as const,
      name: "help-circle-outline",
    },
    label: "Help",
    route: "/profile/help",
  },
  {
    id: "favourites",
    icon: { family: "ion" as const, name: "heart-outline" },
    label: "Favourites",
    route: "/profile/favourites",
  },
  {
    id: "cart",
    icon: { family: "material-community" as const, name: "cart-outline" },
    label: "Cart",
    route: "/profile/cart",
  },
];

export default function ProfileBoxes() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ThemedView style={{ marginTop: 24, paddingHorizontal: 16 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {BUTTONS.map((btn) => (
          <TouchableOpacity
            key={btn.id}
            onPress={() => router.push(btn.route as any)}
            style={{
              flex: 1,
              height: 76,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              backgroundColor: theme.backgroundElement,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <AppIcon
              family={btn.icon.family}
              name={btn.icon.name}
              color={theme.primary}
              size={26}
            />
            <ThemedText type="small" themeColor="textSecondary">
              {btn.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}
