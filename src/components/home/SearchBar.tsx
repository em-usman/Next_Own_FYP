import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/useCart";

const RECENT_SEARCHES = [
  "Mobile Phones",
  "Vehicles",
  "Houses for Rent",
  "Laptops",
  "Jobs",
];

const COUNTRY = "Pakistan";

export function SearchBar() {
  const theme = useTheme();
  const [query, setQuery] = useState("");
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
              {COUNTRY}
            </ThemedText>
            <Ionicons name="chevron-down" size={12} color={theme.textMuted} />
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

      {/* Search input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.backgroundElement,
          borderWidth: 1.5,
          borderColor: theme.border,
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Ionicons name="search-outline" size={18} color={theme.primary} />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 15,
            color: theme.text,
            paddingVertical: 11,
          }}
          placeholder="Search listings..."
          placeholderTextColor={theme.textMuted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Recent searches */}
      <FlatList
        data={RECENT_SEARCHES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setQuery(item)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: theme.backgroundSelected,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <ThemedText style={{ fontSize: 12, color: theme.primary, fontWeight: "500" }}>
              {item}
            </ThemedText>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}
