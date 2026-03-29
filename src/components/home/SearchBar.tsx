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
    <ThemedView className="px-4 py-3 gap-3">
      {/* Search Row */}
      <View className="flex-row items-center gap-3">
        <ThemedView
          type="backgroundElement"
          className="flex-1 flex-row items-center rounded-3xl px-4 py-2 border"
          style={{ borderColor: theme.border }}
        >
          <Ionicons name="search-outline" size={18} color={theme.icon} />
          <TextInput
            className="flex-1 ml-2 text-sm"
            style={{ color: theme.text }}
            placeholder="Search..."
            placeholderTextColor={theme.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </ThemedView>

        {/* Cart */}
        <TouchableOpacity
          onPress={() => router.push("/profile/cart" as any)}
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
          }}
        >
          <Ionicons name="cart-outline" size={20} color={theme.icon} />
          {cartCount > 0 && (
            <View
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1"
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
        </TouchableOpacity>
      </View>

      {/* Country Row */}
      <TouchableOpacity className="flex-row items-center gap-1">
        <Ionicons name="location-sharp" size={16} color={theme.primary} />
        <ThemedText type="small">{COUNTRY}</ThemedText>
        <Ionicons name="chevron-down" size={14} color={theme.textSecondary} />
      </TouchableOpacity>

      {/* Recent Searches Slider */}
      <FlatList
        data={RECENT_SEARCHES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setQuery(item)}
            className="px-4 py-1.5 rounded-full border"
            style={{
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            }}
          >
            <ThemedText type="small" themeColor="textSecondary">
              {item}
            </ThemedText>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}
