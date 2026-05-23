import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/useCart";

export function SearchBar() {
  const theme = useTheme();
  const { cartCount } = useCart();

  return (
    <ThemedView className="px-4 pb-3 gap-2.5">
      {/* Top row: brand + actions */}
      <View className="flex-row items-center justify-between">
        <View>
          <ThemedText type="title" style={{ fontSize: 24, letterSpacing: -0.3 }}>
            Next{" "}
            <ThemedText
              type="title"
              style={{ fontSize: 24, letterSpacing: -0.3, color: theme.primary }}
            >
              Own
            </ThemedText>
          </ThemedText>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Ionicons name="location-sharp" size={13} color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Pakistan
            </ThemedText>
          </View>
        </View>

        {/* Cart icon */}
        <TouchableOpacity
          onPress={() => router.push("/profile/cart" as any)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.backgroundElement,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Ionicons name="cart-outline" size={22} color={theme.icon} />
          {cartCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: theme.primary,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4,
              }}
            >
              <ThemedText style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}>
                {cartCount > 99 ? "99+" : String(cartCount)}
              </ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Tappable search bar — navigates to search screen */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/search" as any)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.backgroundElement,
          borderWidth: 1.5,
          borderColor: theme.border,
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 13,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
          gap: 10,
        }}
      >
        <Ionicons name="search-outline" size={18} color={theme.primary} />
        <ThemedText style={{ fontSize: 15, color: theme.textMuted, flex: 1 }}>
          Search listings...
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
