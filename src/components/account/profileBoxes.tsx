import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/useCart";

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
  const { cartCount } = useCart();

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
            <View style={{ position: "relative" }}>
              <AppIcon
                family={btn.icon.family}
                name={btn.icon.name}
                color={theme.primary}
                size={26}
              />
              {btn.id === "cart" && cartCount > 0 && (
                <View
                  className="absolute -top-2 -right-3 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1"
                  style={{ backgroundColor: theme.primary }}
                >
                  <ThemedText
                    type="smallBold"
                    style={{ color: theme.white, fontSize: 10 }}
                  >
                    {cartCount > 99 ? "99+" : String(cartCount)}
                  </ThemedText>
                </View>
              )}
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {btn.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}
