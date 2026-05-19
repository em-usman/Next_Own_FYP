import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/useCart";
import { useFavourites } from "@/hooks/useFavourites";

const BUTTONS = [
  {
    id: "help",
    icon: { family: "material-community" as const, name: "help-circle-outline" },
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
  const { favouriteCount } = useFavourites();

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16, flexDirection: "row", gap: 12 }}>
      {BUTTONS.map((btn) => {
        const badge =
          btn.id === "favourites" ? favouriteCount :
          btn.id === "cart" ? cartCount : 0;

        return (
          <TouchableOpacity
            key={btn.id}
            onPress={() => router.push(btn.route as any)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              height: 80,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              backgroundColor: theme.backgroundElement,
              borderWidth: 1,
              borderColor: theme.border,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View style={{ position: "relative" }}>
              <AppIcon
                family={btn.icon.family}
                name={btn.icon.name}
                color={theme.primary}
                size={26}
              />
              {badge > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -6,
                    minWidth: 17,
                    height: 17,
                    borderRadius: 9,
                    backgroundColor: theme.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 3,
                  }}
                >
                  <ThemedText style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "700" }}>
                    {badge > 99 ? "99+" : String(badge)}
                  </ThemedText>
                </View>
              )}
            </View>
            <ThemedText themeColor="textSecondary" style={{ fontSize: 12, fontWeight: "500" }}>
              {btn.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
